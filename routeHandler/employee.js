const express = require("express");
const router = express.Router();

const EmployeeController = require('../controllers/employee');

router.get("/", EmployeeController.getEmployees);


// get a employee data
router.get("/:employeeId", EmployeeController.getEmployee);

// create a employee
router.post("/", EmployeeController.createEmployee)

// update a employee data
router.put("/:employeeId", EmployeeController.updatedEmployee);

// delete employee
router.delete("/:employeeId", EmployeeController.deleteEmployee)

// Block/Unblock an employee
router.patch("/:employeeId", EmployeeController.blockEmployee);
  

module.exports = router;