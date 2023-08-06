/* eslint-disable camelcase */
const express = require("express");
const router = express.Router();
const pool = require("../configs/db.config");

router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    // Query to get workout data for the user from the log table
    const queryString = `
      SELECT timestamp FROM log
      WHERE user_id = $1;
    `;

    const result = await pool.query(queryString, [user_id]);

    // Send workout data as JSON
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching workout data:", error);
    res.status(500).json({ error: "Error fetching workout data" });
  }
});

module.exports = router;
