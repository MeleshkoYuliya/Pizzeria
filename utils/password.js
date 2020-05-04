const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

const genPasswordHash = (password, rounds = SALT_ROUNDS) => {
  const salt = bcrypt.genSaltSync(rounds)
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

const verifyPassword = (password, passwordHash) => bcrypt.compareSync(password, passwordHash);

module.exports = {
  genPasswordHash,
  verifyPassword
}