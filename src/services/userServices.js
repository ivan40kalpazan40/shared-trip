const User = require('../models/User');
const { isConfirmed, hashPass, comparePass } = require('./generalServices');

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

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('You must enter valid email and password!');
    }
    const isMatch = await comparePass(password, user.password);
    if (!isMatch) throw new Error('You must enter valid email and password!');
    return user;
  } catch (error) {
    throw new Error('You must enter valid email and password!');
  }
};

const getUser = (id) => User.findById(id);

const userServices = { register, login, getUser };
module.exports = userServices;
