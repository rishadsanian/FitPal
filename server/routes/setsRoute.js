const router = require('express').Router();
const sets = require('../db/queries/sets');
const pool = require("../configs/db.config");

router.get('/:session_id', (req, res) => {
  sets
    .getSetBySessionId(req.params.session_id)
    .then((sets) => {
      res.json({ sets });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ error: `error from get set by session_id and exercise_id: ${e.message}` });
    });
});

// Route to handle the POST request to /programs
router.post("/session/:id", async(req, res) => {
  try {
    const { set, sessionId, exerciseName } = req.body;

    const insertToSetsString = `
    INSERT INTO sets (session_id, reps, resistant, exercise_name) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    
    // SQL to db
    const result = await pool.query(insertToSetsString, [
      sessionId, set.reps, set.weight, exerciseName ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting program data:", error);
    res.status(500).json({ error: "Error inserting program data" });
  }
});

// Route to handle the POST request to /:id/delete
router.post("/:id/delete", async(req, res) => {
  sets
    .deleteSetById(req.params.id)
    .then((sets) => {
      res.json({ sets });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ error: `error deleting set: ${e.message}` });
    });
});




module.exports = router;