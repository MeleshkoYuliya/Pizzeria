const jwt = require('jsonwebtoken');
const config = require('../config');

const signJWT = userId => jwt.sign({ id: userId }, config.tokenSalt);

const verifyJWT = token => jwt.verify(token, config.tokenSalt);

module.exports = {
  signJWT,
  verifyJWT,
};