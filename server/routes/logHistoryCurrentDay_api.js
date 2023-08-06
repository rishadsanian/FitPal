/* eslint-disable camelcase */
const express = require("express");
const router = express.Router();
const pool = require("../configs/db.config");

router.get("/history/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    // Get the current date in readable format
    const currentDate = new Date().toISOString().split("T")[0];

    // Query to fetch current day workout history for the current user and current date
    const queryString = `
      SELECT * FROM workout_history
      WHERE user_id = $1 AND DATE(timestamp) = $2
      ORDER BY timestamp DESC;
    `;

    const result = await pool.query(queryString, [user_id, currentDate]);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching workout history:", error);
    res.status(500).json({ error: "Error fetching workout history" });
  }
});

module.exports = router;
