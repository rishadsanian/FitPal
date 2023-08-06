const router = require('express').Router();
const exercises = require('../db/queries/exercises');

router.get('/session/:id', (req, res) => {
  exercises
    .getExercisesBySessionId(req.params.id)
    .then((exercises) => {
      res.json({ exercises });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ error: `error from get exercise by session_id: ${e.message}` });
    });
});


module.exports = router;