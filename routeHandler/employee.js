const express = require("express");
// create a router
const router = express.Router();


const { employeeValidator, employeeValidationHanlder } = require("../middleware/employes/employeeValidator")
// controller
const EmployeeController = require('../controllers/employee');

// get all employee list
router.get("/", EmployeeController.getEmployees);

// get a employee data
router.get("/:employeeId", EmployeeController.getEmployee);

// create a employee
router.post("/", employeeValidator, employeeValidationHanlder, EmployeeController.createEmployee);

// update a employee data
router.put("/:employeeId", EmployeeController.updatedEmployee);

// delete employee
router.delete("/:employeeId", EmployeeController.deleteEmployee)

// Block/Unblock an employee
router.patch("/:employeeId", EmployeeController.blockEmployee);
  

module.exports = router;