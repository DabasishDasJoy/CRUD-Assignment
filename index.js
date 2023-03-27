const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const employeeHandler = require("./routeHandler/employee");

// getting the express object to get all the features
const app = express();
require("dotenv").config();

// Define PORT to run the server
const port = process.env.PORT || 5000;

// request parser
app.use(express.json());

// // cors middleware
// const corsOptions = {
//   origin: "*",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// Database connection
const mongoAtlasURI = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.mj0nqa8.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(mongoAtlasURI, {
    // New Url Parser to handle more edge cases and improve robustness
    useNewUrlParser: true,
    // enable new server discovery and monitoring engine in the driver to provide better performance
    useUnifiedTopology: true,
    // Comunicate with this database with the client object
    dbName: "Crud_Assignment",
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// application routes
app.use("/employee", employeeHandler);

app.listen(port, () => {
  console.log("App is running on port", port);
});

// for testing
module.exports = app;
