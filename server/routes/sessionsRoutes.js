const router = require('express').Router();
const sessions = require('../db/queries/sessions');
const pool = require("../configs/db.config");

router.get('/program/:id', (req, res) => {
  sessions
    .getAllSessionByProgramId(req.params.id)
    .then((sessions) => {
      res.json({ sessions });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ error: `error from get all session by program_id: ${e.message}` });
    });
});

// Route to handle the POST request to /programs
router.post("/program/:id", async(req, res) => {
  try {
    const { name, program_id } = req.body;


    console.log(name, program_id)
    // queryString
    const queryString = `
      INSERT INTO Sessions (name, description, program_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    // SQL to db
    const result = await pool.query(queryString, [
      name, "", program_id
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting session data:", error);
    res.status(500).json({ error: "Error inserting session data" });
  }
});

module.exports = router;
