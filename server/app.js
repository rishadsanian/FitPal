/* eslint-disable camelcase */
// declarations
require('dotenv').config();
const { ENVIROMENT, PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const pool = require('./configs/db.config');

//routes import
const catsRoutes = require('./routes/catsRoutes');

const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

app.use('/cats', catsRoutes);

app.get('/', (req, res) => {
  res.json({ greetings: 'hello world' });
});




//-------------------------------LOG----------------------------------//
// Route to handle the POST request to /log
app.post('/log', async (req, res) => {
  try {
    const { exercise_name, reps, resistance, user_id, session_id, exercise_id } = req.body;

    // queryString
    const queryString = `
      INSERT INTO log (exercise_name, reps, resistance, user_id, session_id, exercise_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    // SQL to db
    const result = await pool.query(queryString, [exercise_name, reps, resistance, user_id, session_id, exercise_id]);

 
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Error inserting data' });
  }
});
//-------------------------------------------------------------------------

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
