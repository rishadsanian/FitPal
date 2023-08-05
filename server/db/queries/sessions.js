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

module.exports = { getAllSessionByProgramId };
