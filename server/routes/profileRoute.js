/* eslint-disable camelcase */
const pool = require("./configs/db.config");
const express = require("express");
const router = express.Router();

// Route to handle the POST request to /profile
router.post("/", async (req, res) => {
  try {
    const { user_id, age, height, weight, gender } = req.body;

    // queryString
    const queryString = `
      INSERT INTO Profile (user_id, age, height, weight, gender)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    // SQL to db
    const result = await pool.query(queryString, [
      user_id,
      age,
      height,
      weight,
      gender,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting profile data:", error);
    res.status(500).json({ error: "Error inserting profile data" });
  }
});

module.exports = router;
