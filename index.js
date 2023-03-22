const express = require("express");
const mongoose = require("mongoose");

// getting the express object to get all the features
const app = express();
require("dotenv").config();

// Define PORT to run the server
const port = process.env.PORT || 5000;

// request parser
app.use(express.json());

// Database connection
const mongoAtlasURI = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.mj0nqa8.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(
    mongoAtlasURI,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
  ).then(() => {
    console.log("MongoDB connected");
  }).catch((error) => {
    console.log("MongoDB connection error:", error);
  });


// error handling


app.listen(port, ()=> {
    console.log("App is running on port", port);
})