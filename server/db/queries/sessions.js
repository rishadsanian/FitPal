const db = require('../../configs/db.config');

const getAllSessionByProgramId = (id) => {
  return db
    .query(
      `SELECT * FROM sessions
      WHERE program_id = $1;`,
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

const setNameForSession = (data) => {
  return db
    .query(`UPDATE sessions SET name = $1 WHERE id = $2`, [data.name, data.id])
    .then((data) => {
      return data.rows[0];
    });
};

const deleteSession = (id) => {
  return db.query(`DETELE sessions `)
}

module.exports = {
  getAllSessionByProgramId,
  getSessionById,
  setNameForSession,
};
