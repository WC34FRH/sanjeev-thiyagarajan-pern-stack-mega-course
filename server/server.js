require("dotenv").config();
const express = require("express");
const db = require("./db");
// const morgan = require("morgan");
const app = express();

// app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log("middleware ran");
//   res.status(404).json({
//     status: "fail",
//   });
//   next();
// });

app.use(express.json());

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");

    console.log(results);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);

    // console.log(results.rows[0]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );

    console.log(results);

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    // console.log(results);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }

  console.log(req.params.id);
  console.log(req.body);
});

// Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
