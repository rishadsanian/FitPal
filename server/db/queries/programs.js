const db = require('../../configs/db.config');

const getAllPrograms = () => {
  return db.query('SELECT * FROM programs ORDER BY id DESC;').then((data) => {
    return data.rows;
  });
};

const getAllProgramsByUserId = (id) => {
  return db
    .query('SELECT * FROM programs WHERE user_id = $1 ORDER BY id;', [id])
    .then((data) => {
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

const deleteProgramById = (id) => {
  return db
    .query('DELETE FROM programs WHERE id = $1 RETURNING *;', [id])
    .then((data) => {
      return data.rows;
    });
}

module.exports = { getAllPrograms, getAllProgramsByUserId, getProgramById, getProgramBySessionId, deleteProgramById };
