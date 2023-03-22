const express = require("express");
const mongoose = require("mongoose");

// getting the express object to get all the features
const app = express();
require("dotenv").config();

// Define PORT to run the server
const port = process.env.PORT || 5000;

// Database connection
mongoose.connect(
    process.env.mongoAtlasURI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(() => {
    console.log("MongoDB connected");
  }).catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.listen(port, ()=> {
    console.log("App is running on port", port);
})