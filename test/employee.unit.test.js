const { expect } = require("chai");
const sinon = require("sinon");
const Employee = require("../schemas/employeeSchema");
const { updatedEmployee, deleteEmployee } = require("../controllers/employee");

describe("---------------Employee Controller - UNIT Test ---------", () => {
  // describtion for updatedEmployee function
  describe("updatedEmployee", () => {
    // it block for testing if the function updates an employee by id
    it("should update an employee by id", async () => {
      // request object for the test definition
      const req = {
        params: { employeeId: "64226271d84a6c25e809b26b" },
        body: { firstName: "John", lastName: "Doe", phone: "555-555-5555" },
      };

      // define the response object for the test
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      // stubbing the `findByIdAndUpdate` method to resolve with an empty object
      const findByIdAndUpdateStub = sinon
        .stub(Employee, "findByIdAndUpdate")
        .resolves({});

      // calling the `updatedEmployee` function with the request and response objects
      await updatedEmployee(req, res);

      // asserting that the `findByIdAndUpdate` method is called once with the correct arguments
      expect(
        findByIdAndUpdateStub.calledOnceWith(
          "64226271d84a6c25e809b26b",
          req.body
        )
      ).to.be.true;

      // asserting that the response status is 200
      expect(res.status.calledOnceWith(200)).to.be.true;

      // asserting that the response json method is called once with the correct message
      expect(res.json.calledOnceWith({ message: "Update Successfull!" })).to.be
        .true;

      // restoring the stubbed method
      findByIdAndUpdateStub.restore();
    });

    it("should return 404 if employee is not found", async () => {
      // Define request parameters
      const req = {
        params: { employeeId: "123" },
        body: { firstName: "John", lastName: "Doe", phone: "555-555-5555" },
      };
      // Define a response object with stubbed methods
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      // Create a stub for the 'findByIdAndUpdate' method of the Employee schema
      const findByIdAndUpdateStub = sinon.stub(Employee, "findByIdAndUpdate");

      // Resolve with null if ID is "123" which is an invalid id
      findByIdAndUpdateStub.withArgs("123").resolves(null);

      // Resolve with a truthy value for any other ID
      findByIdAndUpdateStub.resolves({});

      // Call the function being tested
      await updatedEmployee(req, res);

      // Assertions to check if the response is as expected
      expect(findByIdAndUpdateStub.calledOnceWith("123", req.body)).to.be.true;
      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.json.calledOnceWith({ message: "Employee not found" })).to.be
        .true;

      // Restore the stubbed method
      findByIdAndUpdateStub.restore();
    });

    it("should return 500 if there is a server error", async () => {
      // Define mock request object
      const req = {
        params: { employeeId: "123" },
        body: { firstName: "John", lastName: "Doe", phone: "555-555-5555" },
      };

      // Define mock response object with stubbed status and json methods
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      // Stub the Employee.findByIdAndUpdate method to throw an error
      const findByIdAndUpdateStub = sinon
        .stub(Employee, "findByIdAndUpdate")
        .throws();

      // Call the tested function with the mock request and response objects
      await updatedEmployee(req, res);

      // Verify that the stubbed method was called with the correct arguments
      expect(findByIdAndUpdateStub.calledOnceWith("123", req.body)).to.be.true;

      // Verify that the response status and json methods were called with the correct arguments
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnceWith({ message: "Server Error" })).to.be.true;

      // Restore the stubbed method to its original implementation
      findByIdAndUpdateStub.restore();
    });
  });

  // describtion for deleteEmployee function
  describe("deleteEmployee", () => {
    it("should delete the employee", async () => {
      // req object definition
      const req = {
        params: { employeeId: "64226271d84a6c25e809b26b" },
      };

      // res object definition
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      // create a stub to resolve with empty object
      const findByIdAndDeleteStub = sinon
        .stub(Employee, "findByIdAndDelete")
        .resolves({});

      // Call the "deleteEmployee"  method
      await deleteEmployee(req, res);

      // Assertion to check for expected response
      expect(findByIdAndDeleteStub.calledOnceWith("64226271d84a6c25e809b26b"))
        .to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(
        res.json.calledOnceWith({ message: "Employee deleted successfully" })
      ).to.be.true;

      // Restore stubbed method
      findByIdAndDeleteStub.restore();
    });

    it("should return 404 if employee is not found", async () => {
      // Define request parameters
      const req = {
        params: { employeeId: "123" },
      };

      // Define a response object with stubbed methods
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      // Create a stub for the 'findByIdAndDelete' method of the Employee schema
      const findByIdAndDeleteStub = sinon.stub(Employee, "findByIdAndDelete");

      // Resolve with null if ID is "123" which is an invalid id
      findByIdAndDeleteStub.withArgs("123").resolves(null);

      // Resolve with a truthy value for any other ID
      findByIdAndDeleteStub.resolves({});

      // Call the function being tested
      await deleteEmployee(req, res);

      // Assertions to check if the response is as expected
      expect(findByIdAndDeleteStub.calledOnceWith("123")).to.be.true;
      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.json.calledOnceWith({ message: "Employee not found" })).to.be
        .true;

      // Restore the stubbed method
      findByIdAndDeleteStub.restore();
    });

    it("should return 500 if there is a server error", async () => {
      // Define mock request object
      const req = {
        params: { employeeId: "123" },
      };

      // Define mock response object with stubbed status and json methods
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      // Stub the Employee.findByIdAndDelete method to throw an error
      const findByIdAndDeleteStub = sinon
        .stub(Employee, "findByIdAndDelete")
        .throws();

      // Call the tested function with the mock request and response objects
      await deleteEmployee(req, res);

      // Verify that the stubbed method was called with the correct arguments
      expect(findByIdAndDeleteStub.calledOnceWith("123")).to.be.true;

      // Verify that the response status and json methods were called with the correct arguments
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnceWith({ message: "Server Error" })).to.be.true;

      // Restore the stubbed method to its original implementation
      findByIdAndDeleteStub.restore();
    });
  });
});
