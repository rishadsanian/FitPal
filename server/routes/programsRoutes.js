const router = require('express').Router();
const programs = require('../db/queries/programs');
const pool = require("../configs/db.config");

router.get('/', (req, res) => {
  programs
    .getAllPrograms()
    .then((program) => {
      res.json({ program });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ error: `error from get all programs: ${e.message}` });
    });
});

router.get('/:id', (req, res) => {
  programs
    .getProgramById(req.params.id)
    .then((program) => {
      res.json({ program });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ error: `error from get program by id: ${e.message}` });
    });
});

// Route to handle the POST request to /programs
router.post("/", async(req, res) => {
  try {
    const { name, description } = req.body;

    // queryString
    const queryString = `
      INSERT INTO Programs (name, description)
      VALUES ($1, $2)
      RETURNING *;
    `;

    // SQL to db
    const result = await pool.query(queryString, [
      name, description
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting program data:", error);
    res.status(500).json({ error: "Error inserting program data" });
  }
});

// Route to handle the POST request to /programs/:id/delete
router.post('/:id/delete', (req, res) => {
  programs
    .deleteProgramById(req.params.id)
    .catch((e) => {
      res
        .status(500)
        .json({ error: `error deleting program by id: ${e.message}` });
    });
});

module.exports = router;
