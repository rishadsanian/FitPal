/* eslint-disable camelcase */
const pool = require("../configs/db.config");
const express = require("express");
const router = express.Router();

router.get("/:user_id", async(req, res) => {
  try {
    const { user_id } = req.params;

    // queryString
    const queryString = `
    SELECT p.*, pr.name, pr.description
    FROM Profile p
    LEFT JOIN programs pr ON p.program_id = pr.id
    WHERE p.user_id = $1
    ORDER BY p.timestamp DESC
    LIMIT 1;
  `;

    // SQL to db
    const result = await pool.query(queryString, [user_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ error: "Error fetching profile data" });
  }
});

module.exports = router;