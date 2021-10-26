const User = require('../models/User');

const register = (user) => User.create(user);

const userServices = { register };
module.exports = userServices;
