const router = require('express').Router();
const sets = require('../db/queries/sets');

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

module.exports = router;