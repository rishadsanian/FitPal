const router = require('express').Router();
const passport = require('passport');
const users = require('../db/queries/users');
const LocalStraegy = require('passport-local');

const isEmailRegistered = (email) => {
  users.getUserByEmail(email).then((user) => {
    if (!user) {
      return false;
    } else {
      return true;
    }
  });
};

passport.use(
  new LocalStraegy((username, password, done) => {
    if (isEmailRegistered) {
      return done(null, false, {
        message: 'Incorrect username or password.',
      });
    }
    users
      .createUser({ email, password })
      .then((user) => {
        return done(null, user);
      })
      .catch((e) => done(e));
  })
);
