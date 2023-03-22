const mongoose = require("mongoose");
const Employee  = require("../schemas/employeeSchema");

// Get employee lists
exports.getEmployees = async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// get a employee by id
exports.getEmployee = async (req, res) => {
    try {
      const { employeeId } = req.params;
      const employee = await Employee.findById(employeeId);
  
      // check if employee exists
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.status(200).json(employee);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
};


// create an employee
exports.createEmployee = async( req, res)=> {
    try {
      // create new employee data 
      const newEmployee = new Employee(req.body);
        
      // create employee in databse
      const result = await newEmployee.save();

      // send response
      res.status(201).json({ message: "Employee created successfully", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// block an employee
exports.blockEmployee = async (req, res) => {
    try {
      const { employeeId } = req.params;
      const { block } = req.query;
  
      const updatedEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        { block },
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.status(200).json("Blocked Successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
};

// Update an employee by id
exports.updatedEmployee = async (req, res) => {
    try {
      const { employeeId } = req.params;
      const { firstName, lastName, phone} = req.body;
      const updatedEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        { firstName, lastName, phone},
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.status(200).json({message: "Update Successfull!"});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
};

// Delete an employee by id
exports.deleteEmployee = async (req, res)=> {
    try {
        // get employee id from query params
        const { employeeId } = req.params;

        // find the employee and delete
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
        
        // Error if employee not found
        if (!deletedEmployee) {
          return res.status(404).json({ message: "Employee not found" });
        }
    
        // result if employee found
        res.status(200).json({ message: "Employee deleted successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};