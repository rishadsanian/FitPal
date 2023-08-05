/* eslint-disable camelcase */

const pool = require("./configs/db.config");
const express = require("express");
const router = express.Router();

// Route to handle the POST request to /log
router.post("/", async (req, res) => {
  try {
    const {
      exercise_name,
      reps,
      resistance,
      user_id,
      session_id,
      exercise_id,
    } = req.body;

    // queryString
    const queryString = `
      INSERT INTO log (exercise_name, reps, resistance, user_id, session_id, exercise_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    // SQL to db
    const result = await pool.query(queryString, [
      exercise_name,
      reps,
      resistance,
      user_id,
      session_id,
      exercise_id,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Error inserting data" });
  }
});

module.exports = router;
