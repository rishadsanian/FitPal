const router = require('express').Router();
const sessions = require('../db/queries/sessions');
const pool = require('../configs/db.config');

router.get('/program/:id', (req, res) => {
  sessions
    .getAllSessionByProgramId(req.params.id)
    .then((sessions) => {
      res.json({ sessions });
    })
    .catch((e) => {
      res.status(500).json({
        error: `error from get all session by program_id: ${e.message}`,
      });
    });
});

router.get('/:id', (req, res) => {
  sessions
    .getSessionById(req.params.id)
    .then((sessions) => {
      res.json({ sessions });
    })
    .catch((e) => {
      res.status(500).json({
        error: `error from get session by session_id: ${e.message}`,
      });
    });
});

// Route to handle the POST request to /programs
router.post('/program/:id', async (req, res) => {
  try {
    const { name, program_id } = req.body;
    // queryString
    const queryString = `
      INSERT INTO Sessions (name, program_id)
      VALUES ($1, $2)
      RETURNING *;
    `;

    // SQL to db
    const result = await pool.query(queryString, [name, program_id]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting session data:', error);
    res.status(500).json({ error: 'Error inserting session data' });
  }
});

router.post('/:id', (req, res) => {
  const { id, name } = req.body;
  const data = { id, name };
  sessions
    .setNameForSession(data)
    .then(() => {
      res.send({ message: 'updated' });
    })
    .catch((e) => res.send(e));
});

router.delete('/:id', (req, res) => {
  sessions
    .deleteSession(req.params.id)
    .then(() => {
      res.send({ message: 'session deleted' });
    })
    .catch((e) => res.send(e));
});

module.exports = router;
