require('dotenv').config();

module.exports = {
  env: process.env.ENV || 'dev',
  port: process.env.PORT || 4000,
  mongoURL: process.env.MONGODB_URI || '',
  tokenSalt: process.env.TOKEN_SALT,
  webHost: process.env.WEB_HOST,
};