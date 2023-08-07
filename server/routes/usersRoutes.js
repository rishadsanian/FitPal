const router = require('express').Router();
const users = require('../db/queries/users');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.getUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Incorrect email/password' });
    }

    req.session.userID = user.id;
    res.json({
      user: {
        email: user.email,
        id: user.id,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/logout', (req, res) => {
  req.session.userID = null;
  res.send({});
});

router.post('/', async (req, res) => {
  try {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);

    const registeredEmail = await users.getUserByEmail(user.email);
    if (registeredEmail) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const result = await users.createUser(user);
    req.session.userID = result.id;
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
