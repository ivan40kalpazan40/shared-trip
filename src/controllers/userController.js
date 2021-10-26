const router = require('express').Router();
const { jwtSign } = require('../config/util.config');
const { SECRET, COOKIE_TOKEN_NAME } = require('../config/constants.config');
const userServices = require('../services/userServices');

const renderRegister = (req, res) => {
  res.render('user/register');
};

const registerAndLog = async (req, res) => {
  const { email, password, rePassword, gender } = req.body;
  try {
    const user = await userServices.register(
      email,
      password,
      rePassword,
      gender
    );
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    res.render('404');
  }
};

const renderLogin = (req, res) => {
  res.render('user/login');
};

const loginUser = async (req, res) => {
  const { email, password, gender } = req.body;
  try {
    const user = await userServices.login(email, password);
    const payload = { _id: user._id, email: user.email, gender: user.gender };
    const token = await jwtSign(payload, SECRET);
    res.cookie(COOKIE_TOKEN_NAME, token, { httpOnly: true }).redirect('/');
  } catch (error) {
    console.log(error.message);
    res.render('404');
  }
};

router.get('/register', renderRegister);
router.post('/register', registerAndLog);
router.get('/login', renderLogin);
router.post('/login', loginUser);
module.exports = router;
