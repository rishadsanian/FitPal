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



module.exports = { getSetBySessionId };