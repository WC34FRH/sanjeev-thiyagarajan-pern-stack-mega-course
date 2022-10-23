require("dotenv").config();
const express = require("express");
// import { express } from "express";

const app = express();

// Get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurant: ["McDonald's", "Wendy's"],
    },
  });
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params);
});

// Create a restaurant
app.get("/api/v1/restaurants", (req, res) => {
  console.log(req.params);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
