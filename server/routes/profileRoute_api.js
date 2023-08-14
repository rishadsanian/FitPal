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

    // if (result.rows.length === 0) {
    //   return res.status(404).json({ error: "Profile not found" });
    // }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ error: "Error fetching profile data" });
  }
});

router.get("/:user_id/:interval", async(req, res) => {
  const user_id = req.params.user_id;
  const interval = req.params.interval;

  try {
    const intervalQuery = {
      "7d": "timestamp >= now() - interval '7 days'",
      "30d": "timestamp >= now() - interval '30 days'",
      "1yr": "timestamp >= now() - interval '1 year'",
    };

    const queryString = `
    SELECT date_trunc('day', timestamp) AS day, ARRAY_AGG(weight) AS weights
    FROM Profile
    WHERE user_id = $1 AND ${intervalQuery[interval]}
    GROUP BY day
    ORDER BY day;
`;

    const result = await pool.query(queryString, [user_id]);

    // if (result.rows.length === 0) {
    //   return res.status(404).json({ error: "Profile not found" });
    // }

    res.json(result.rows); // Return the entire array of rows
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ error: "Error fetching profile data" });
  }
});

module.exports = router;
