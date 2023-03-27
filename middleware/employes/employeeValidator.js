const { check, validationResult } = require("express-validator");
const Employee = require("../../schemas/employeeSchema");
const { createError } = require("http-errors");

const employeeValidator = [
  check("firstName")
    .isLength({ min: 1 })
    .withMessage("First Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name is invalid")
    .trim(),
  check("lastName")
    .isLength({ min: 1 })
    .withMessage("Last Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name is invalid")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const employee = await Employee.findOne({ email: value });

        if (employee) {
          throw createError("Email already exists");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("phone").custom(async (value) => {
    try {
      const employee = await Employee.findOne({ phone: value }); //made mistake, it should be phone field

      if (employee) {
        throw createError("Phone number already exists");
      }
    } catch (err) {
      throw createError(err.message);
    }
  }),
];

// handle validation error
const employeeValidationHanlder = function (req, res, next) {
  const errors = validationResult(req);

  // get structured output array
  const mappedErrors = errors.mapped();

  // if error not found send to next middleware
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({ message: "There was an error" });
  }
};

module.exports = {
  employeeValidator,
  employeeValidationHanlder,
};
