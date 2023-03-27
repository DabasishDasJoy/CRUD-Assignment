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
  });
});
