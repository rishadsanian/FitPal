const db = require('../../configs/db.config');

const getAllPrograms = () => {
  return db.query('SELECT * FROM programs;').then((data) => {
    return data.rows;
  });
};

const getProgramById = (id) => {
  return db
    .query('SELECT * FROM programs WHERE id = $1;', [id])
    .then((data) => {
      return data.rows[0];
    });
};

const getProgramBySessionId = (id) => {
  return db
    .query('SELECT * FROM programs JOIN sessions ON sessions.program_id = programs.id WHERE id = $1;', [id])
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getAllPrograms, getProgramById, getProgramBySessionId };
