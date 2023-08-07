const db = require('../../configs/db.config');

const getUserById = (id) => {
  return db
    .query('SELECT * FROM users; WHERE id = $1', [id])
    .then((data) => {
      return data.rows;
    });
};

const getUserByEmail = (email) => {
  return db
    .query('SELECT * FROM users; WHERE email = $1', [email])
    .then((data) => {
      return data.rows[0];
    });
};

const createUser = (user) => {
  const queryString = `INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *;`;
  const values = [user.email, user.password];
  return db
    .query(queryString, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((e) => console.log(e));
};

module.exports = { getUserByEmail, getUserById, createUser };
