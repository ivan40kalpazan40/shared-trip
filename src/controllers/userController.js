const router = require('express').Router();
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

router.get('/register', renderRegister);
router.post('/register', registerAndLog);
router.get('/login', renderLogin);
module.exports = router;
