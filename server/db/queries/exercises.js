const db = require('../../configs/db.config');

const getExercisesBySessionId = (id) => {
  const url = `
    SELECT exercises.id, exercises.name, exercises.difficulty, exercises.muscle, sessions.name AS session FROM exercises
    JOIN sessions_exercises
    ON exercises.id = sessions_exercises.exercise_id
    JOIN sessions
    ON sessions.id = sessions_exercises.session_id
    WHERE sessions.id = $1;
  `;
  return db.query(url, [id]).then((data) => {
    return data.rows;
  });
};

module.exports = { getExercisesBySessionId };
