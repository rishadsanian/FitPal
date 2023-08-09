const db = require('../../configs/db.config');

const getSetBySessionId = (session_id) => {
  const url = `
    SELECT * FROM sets
    WHERE session_id = $1;
  `;
  return db.query(url, [session_id]).then((data) => {
    return data.rows;
  });
};

const deleteSetById = (id) => {
  return db.query('DELETE FROM sets WHERE id = $1;', [id]).then((data) => {
    return data.rows;
  });
};

const getSetsBySessionAndExercise = (data) => {
  const queryString = `
    SELECT * FROM sets
    WHERE session_id = $1 AND exercise_name = $2;
  `;
  const { session_id, exercise_name } = data;
  return db
    .query(queryString, [session_id, exercise_name])
    .then((data) => {
      if (!data) {
        return 'Error of getting set';
      }
      return data.rows;
    })
    .catch((e) => console.log(`Error from getting set: ${e.message}`));
};

module.exports = { getSetBySessionId, deleteSetById, getSetsBySessionAndExercise };
