const mongoose = require("mongoose");

// create schema
const employeeSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    block: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  // keep track the data times
  {
    timestamps: true,
  }
);

// create the model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
