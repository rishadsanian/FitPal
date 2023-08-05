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

module.exports = router;
