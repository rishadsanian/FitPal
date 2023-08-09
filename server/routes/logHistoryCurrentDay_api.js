/* eslint-disable camelcase */
const express = require("express");
const router = express.Router();
const pool = require("../configs/db.config");

router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { date } = req.query;
  

    // Query to fetch current day workout history for the current user and current date
    const queryString = `
    SELECT * FROM log
    WHERE user_id = $1 AND timestamp::date = $2
    ORDER BY timestamp DESC;
  `;
    const result = await pool.query(queryString, [user_id, date]);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching workout history:", error);
    res.status(500).json({ error: "Error fetching workout history" });
  }
});

module.exports = router;
