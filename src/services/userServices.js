const User = require('../models/User');
const { isConfirmed, hashPass } = require('./generalServices');

const register = async (email, password, rePassword, gender) => {
  if (!isConfirmed(password, rePassword)) {
    throw new Error('You need to confirm your password.');
  }
  try {
    const hashed = await hashPass(password);
    const user = await User.create({ email, password: hashed, gender });
    return user;
  } catch (error) {
    throw new Error('You need to enter valid credentials');
  }
};

const userServices = { register };
module.exports = userServices;
