const db = require('../../configs/db.config');

const getUserById = async (id) => {
  try {
    const data = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return data.rows[0];
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const data = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return data.rows[0];
  } catch (error) {
    throw error;
  }
};

const createUser = async (user) => {
  const queryString = 'INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *';
  const values = [user.email, user.password];
  try {
    const result = await db.query(queryString, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserByEmail, getUserById, createUser };
