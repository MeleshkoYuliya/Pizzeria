const User = require('../models/user.model');
const { verifyJWT } = require('../utils/token');
const { UnauthorizedError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  try {
    const data = verifyJWT(token);

    User
      .findById(data.id)
      // use async/await
      .then(user => {
        if (!user) next(new UnauthorizedError('Invalid token'));

        req.user = user;
        next();
      })
      .catch(err => next(err));
  } catch {
    next(new UnauthorizedError('Invalid token'))
  }
}