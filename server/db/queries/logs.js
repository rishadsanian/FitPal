/* eslint-disable camelcase */
const db = require('../../configs/db.config');

// not used for demo
const getLogByUserIdAndInterval = (user_id, interval) => {
  const intervalQuery = {
    "7days": "timestamp >= now() - interval '7 days'",
    "30days": "timestamp >= now() - interval '30 days'",
    "1year": "timestamp >= now() - interval '1 year'",
  };

  const queryString = `
    SELECT * FROM log
    WHERE user_id = $1 AND ${intervalQuery[interval]}
    ORDER BY timestamp DESC
  `;

  return db
    .query(queryString, [user_id])
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
  ORDER BY timestamp DESC
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
module.exports = { getLogByUserIdAndExercise, getLogByUserIdAndInterval };
