/* eslint-disable camelcase */
const db = require("../../configs/db.config");

const getSetBySessionId = (session_id) => {
  const url = `
    SELECT * FROM sets
    WHERE session_id = $1;
  `;
  return db.query(url, [session_id]).then((data) => {
    return data.rows;
  });
};

const getSetsByProgramId = (program_id) => {
  const url = `
    SELECT sets.exercise_name AS name, sets.resistant AS resistant, sets.reps AS reps FROM sets
    JOIN sessions ON sets.session_id = sessions.id
    JOIN programs ON programs.id = sessions.program_id
    WHERE programs.id = $1;
  `;
  return db.query(url, [program_id]).then((data) => {
    return data.rows;
  });
};

const deleteSetById = (id) => {
  return db.query("DELETE FROM sets WHERE id = $1;", [id]).then((data) => {
    return data.rows;
  });
};

module.exports = { getSetBySessionId, getSetsByProgramId, deleteSetById };
