const express = require('express');

const { UnauthorizedError } = require('../utils/errors');
const { verifyPassword } = require('../utils/password');
const { signJWT } = require('../utils/token');

const User = require('../models/user.model');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  // sanitize the input
  const { email, password } = req.body;

  const newUser = new User({ email, password });

  newUser
    .save()
    // use async/await, it's easier to read/follow
    .then(user => {
      const token = signJWT(user._id);
      res.json({ user, token });
      sendWelcomeEmail(user.email);
    })
    .catch(err => next(err));
});

router.post('/login', (req, res, next) => {
  // sanitize the input
  const { email, password } = req.body;

  User
    .findOne({ email })
    // use async/await, it's easier to read/follow
    .then(user => {
      if (!user) return Promise.reject(new UnauthorizedError('Wrong email or password!'));

      const isPasswordValid = verifyPassword(password, user.password);

      if (!isPasswordValid) return Promise.reject(new UnauthorizedError('Wrong email or password!'));

      return user.save();
    })
    .then(user => {
      const token = signJWT(user._id);

      res.json({ user, token });
    })
    .catch(err => next(err));
});

module.exports = router;