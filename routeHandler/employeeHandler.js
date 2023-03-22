const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const employeeSchema = require("../schemas/employeeSchema");

// create model
const Employee  = new mongoose.model("Employee", employeeSchema);

// get all the employee
router.get("/", async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
});


// create a employee
router.post("/", async( req, res)=> {
    try {
        // create new employee data 
        const newEmployee = new Employee(req.body);
        
        // create employee in databse
        await newEmployee.save();

        // send response
        res.status(201).json({ message: "Employee created successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})


// Update employee
router.put("/:employeeId", async( req, res)=> {
    
})

// delete employee
router.delete("/:employeeId", async (req, res)=> {
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
})

// block employee
router.patch("/", async (req, res)=> {

})

module.exports = router;