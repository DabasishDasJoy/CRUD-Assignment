// Import required packages and modules
const mongoose = require("mongoose"); // For interacting with MongoDB
const Employee = require("../schemas/employeeSchema"); // Mongoose schema for Employee
const chai = require("chai"); // Assertion library
const chaiHttp = require("chai-http"); // HTTP integration testing
const should = chai.should(); // Configure chai assertion style
const app = require("../index"); // Express app to test
const { describe, beforeEach, afterEach } = require("mocha"); // Test framework
const sinon = require("sinon"); // For mocking/stubbing functions

chai.use(chaiHttp); // Configure chai to use chai-http for HTTP testing

// test cases for Employees End Point
describe("Employees", () => {
  // Employee object that will be used for testing
  const employee = {
    firstName: "Sakib",
    lastName: "Al Hasan",
    phone: "018769097120",
    email: "sakib.alhasan@gmail.com",
  };

  let employeeId; // To hold the ID of the employee created for testing

  // Create an employee before running the tests
  beforeEach(async () => {
    const newEmployee = await Employee.create(employee); // Create a new employee in the database
    employeeId = newEmployee._id; // Store the ID of the newly created employee
  });

  // Delete the employee after running the tests
  afterEach(async () => {
    await Employee.deleteOne({ _id: employeeId }); // Delete the employee from the database
  });

  // Test case for update an employee
  describe("/PUT employee/:id", () => {
    it("it should update an employee by id", (done) => {
      const updatedEmployee = {
        firstName: "Mashrafee",
        lastName: "Mortaza",
        phone: "01555555555",
      };

      chai
        .request(app)
        .put(`/employee/${employeeId}`) // Make a PUT request to update the employee
        .send(updatedEmployee) // Send the updated employee object in the request body
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200); // Expect the HTTP response status code to be 200 OK
          res.body.should.be.a("object"); // Expect the response body to be an object
          res.body.should.have.property("message").eql("Update Successfull!"); // Expect the response message to indicate successful update
          done(); // Call done() to indicate the test case is complete
        });
    });

    // test case for if employee is not found
    it("it should return 404 if employee not found", (done) => {
      const updatedEmployee = {
        firstName: "Kabir",
        lastName: "Khan",
        phone: "0175545687",
      };
      chai
        .request(app)
        .put("/employee/642151e1f8e4988b9c8a4d5f") // Make a PUT request to update an employee that doesn't exist
        .send(updatedEmployee)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(404); // Expect the HTTP response status code to be 404 Not Found or 500 Internal Server Error
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Employee not found"); // Expect the response message to indicate employee not found
          done(); // Test case complete
        });
    });

    // Test case for server error
    it("should return 500 if server error in update", (done) => {
      // Create a new error object to use as a mock error
      const mockError = new Error("Server Error");
      // Create a stub for the findByIdAndUpdate method on the Employee model
      sinon.stub(Employee, "findByIdAndUpdate").throws(mockError);
      // Create an object representing the updated employee data
      const updatedEmployee = {
        firstName: "Jane",
        lastName: "Doe",
        phone: "9876543210",
      };

      // Send a PUT request to the app with the updated employee data
      chai
        .request(app)
        .put(`/employee/${employeeId}`)
        .send(updatedEmployee)
        .end((err, res) => {
          Employee.findByIdAndUpdate.restore(); // Restore the stubbed method to its original implementation
          if (err) return done(err); // If there is an error in the request, pass it to the done() callback
          res.should.have.status(500); // Assert that the response has a status code of 500
          res.body.should.be.a("object"); // Assert that the response body is an object
          res.body.should.have.property("message").eql("Server Error"); // Assert that the response body has a "message" property equal to "Server Error"
          done(); // Test case is completed
        });
    });
  });

  // Test cases for Delete an employee
  describe("/DELETE employee/:id", () => {
    it("it should delete an employee by id", (done) => {
      chai
        .request(app)
        .delete(`/employee/${employeeId}`) // make a DELETE request with the employee id to be deleted
        .end((err, res) => {
          // check response
          if (err) return done(err); // if error, return error message
          res.should.have.status(200);
          res.body.should.be.a("object"); // assert response body to be an object
          res.body.should.have
            .property("message")
            .eql("Employee deleted successfully"); // assert response message to be "Employee deleted successfully"
          done(); // call done to end the test case
        });
    });

    // test case for if an employee is not found
    it("it should return 404 if employee not found", (done) => {
      chai
        .request(app)
        .delete("/employee/642151e1f8e4988b9c8a4d5e")
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Employee not found");
          done();
        });
    });

    // test case for if server throws an error
    it("should return 500 if server error", (done) => {
      const mockError = new Error("Server Error");
      sinon.stub(Employee, "findByIdAndDelete").throws(mockError);

      chai
        .request(app)
        .delete(`/employee/${employeeId}`)
        .end((err, res) => {
          Employee.findByIdAndDelete.restore(); // restore the stubbed method
          if (err) return done(err);
          res.should.have.status(500);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Server Error");
          done();
        });
    });
  });
});
