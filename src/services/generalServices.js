const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/constants.config');

exports.isConfirmed = (pass, repass) => {
  return pass === repass;
};
exports.hashPass = (pass) => {
  return bcrypt.hash(pass, SALT_ROUNDS);
};

exports.comparePass = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
