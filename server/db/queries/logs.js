const db = require('../../configs/db.config');

const getLogByUserId = (data) => {
  const queryString = `
  SELECT * FROM log
  WHERE user_id = $1 
  ORDER BY timestamp DESC
  `;
  return db
    .query(queryString, [data.user_id])
    .then((data) => {
      return data.rows;
    })
    .catch((e) => {
      console.log(e);
    });
};

const getLogByUserIdAndExercise = (data) => {
  const queryString = `
  SELECT * FROM log
  WHERE user_id = $1 AND exercise_name = $2
  `;
  return db
    .query(queryString, [data.user_id, data.exercise_name])
    .then((data) => {
      return data.rows;
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = { getLogByUserId, getLogByUserIdAndExercise };
