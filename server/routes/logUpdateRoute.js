/* eslint-disable camelcase */

const pool = require("../configs/db.config");
const express = require("express");
const router = express.Router();

// Route to handle the PUT request to /log/:workoutId
router.put("/:workoutId", async (req, res) => {
  try {
    const { exercise_name, reps, resistance, user_id, session_id, exercise_id } = req.body;
    const workoutId = req.params.workoutId; // Get the workout ID from the route parameter

    // Define the update query
    const queryString = `
      UPDATE log
      SET exercise_name = $1, reps = $2, resistance = $3, user_id = $4, session_id = $5, exercise_id = $6
      WHERE id = $7
      RETURNING *;
    `;

    // Execute the update query
    const result = await pool.query(queryString, [exercise_name, reps, resistance, user_id, session_id, exercise_id, workoutId]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Error updating data" });
  }
});
module.exports = router;