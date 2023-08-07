const db = require('../../configs/db.config');

const getSetBySessionAndExerciseId = (session_id, exercise_id) => {
  const url = `
    SELECT * FROM sets
    WHERE session_id = $1 AND exercise_id = $2;
  `;
  return db.query(url, [session_id, exercise_id]).then((data) => {
    return data.rows;
  });
};



module.exports = { getSetBySessionAndExerciseId };