const router = require('express').Router();
const sets = require('../db/queries/sets');

router.get('/:session_id/:exercise_id', (req, res) => {
  sets
    .getSetBySessionAndExerciseId(req.params.session_id, req.params.exercise_id)
    .then((sets) => {
      res.json({ sets });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ error: `error from get set by session_id and exercise_id: ${e.message}` });
    });
});

module.exports = router;