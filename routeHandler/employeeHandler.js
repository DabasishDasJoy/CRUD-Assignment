const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const employeeSchema = require("../schemas/employeeSchema");

// create model
const Employee  = new mongoose.model("Employee", employeeSchema);

// get all the employee
router.get("/", async (req, res)=>{
 
})


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
router.put("/", async( req, res)=> {

})

// delete employee
router.delete("/", async (req, res)=> {

})

// block employee
router.patch("/", async (req, res)=> {

})

module.exports = router;