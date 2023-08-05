const router = require('express').Router();
const programs = require('../db/queries/programs');

router.get('/', (req, res) => {
  programs
    .getAllPrograms()
    .then((p) => {
      res.json({ p });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ error: `error from get all programs: ${e.message}` });
    });
});

module.exports = router;
