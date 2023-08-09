/* eslint-disable no-undef */
/* eslint-disable camelcase */
const pool = require("../configs/db.config");
const express = require("express");
const router = express.Router();

// Route to handle the POST request to /profile
router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      date_of_birth,
      height,
      weight,
      gender,
      fitness_level,
      program_id,
      goal,
    } = req.body;

    // queryString
    const queryString = `
    INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, fitness_level, program_id, goal)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  
    // SQL to db
    const result = await pool.query(queryString, [
      user_id,
      date_of_birth,
      height,
      weight,
      gender,
      fitness_level,
      program_id,
      goal,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting profile data:", error);
    res.status(500).json({ error: "Error inserting profile data" });
  }
});

module.exports = router;
