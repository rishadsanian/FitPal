const db = require('../../configs/db.config');

const getAllSessionByProgramId = (id) => {
  return db
    .query(
      `SELECT * FROM sessions
      WHERE program_id = $1
      ORDER BY day_of_week;`,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

const getSessionById = (id) => {
  return db
    .query(
      `SELECT * FROM sessions
      WHERE id = $1;`,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

const getSessionByProgramIdAndDay = (program_id, day_of_week) => {
  return db
    .query(
      `SELECT sessions.name AS name FROM sessions
      JOIN programs ON sessions.program_id = programs.id
      WHERE programs.id = $1 AND sessions.day_of_week = $2;`,
      [program_id, day_of_week]
    )
    .then((data) => {
      return data.rows[0];
    });
};

const setNameForSession = (data) => {
  return db
    .query(`UPDATE sessions SET name = $1 WHERE id = $2`, [
      data.name,
      data.id,
    ])
    .then((data) => {
      return data.rows[0];
    });
};

const deleteSession = (id) => {
  return db
    .query(`DELETE FROM sessions  WHERE id = $1;`, [id])
    .then((data) => {
      console.log(data);
      return data.rows;
    })
    .catch((e) => console.log(e));
};

module.exports = {
  getAllSessionByProgramId,
  getSessionById,
  getSessionByProgramIdAndDay,
  setNameForSession,
  deleteSession,
};
