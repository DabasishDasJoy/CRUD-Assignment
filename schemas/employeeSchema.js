const mongoose = require("mongoose");

// create schema
const employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String, 
        required: true,
    },

    block:{
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = employeeSchema;


