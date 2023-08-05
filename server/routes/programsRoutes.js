const router = require('express').Router();
const programs = require('../db/queries/programs');

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

// Route to handle the POST request to /profile
router.post("/", async(req, res) => {
  try {
    const { name, description } = req.body;

    // queryString
    const queryString = `
      INSERT INTO Programs (user_id, age, height, weight, gender)
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

module.exports = router;
