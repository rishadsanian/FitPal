const db = require('../../configs/db.config');

const getLogByExercise = (data) => {
  const queryString = `
  SELECT * FROM log
  WHERE user_id = $1 AND exercise_name = $2
  `;
  return db
    .query(queryString, [data.user_id, data.exercise_name])
    .then((data) => {
      // console.log(data.rows);
      return data.rows;
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = { getLogByExercise };
