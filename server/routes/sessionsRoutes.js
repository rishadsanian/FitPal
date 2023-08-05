const router = require('express').Router();
const sessions = require('../db/queries/sessions');

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

module.exports = router;
