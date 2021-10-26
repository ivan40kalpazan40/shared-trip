const router = require('express').Router();
const userServices = require('../services/userServices');

const renderRegister = (req, res) => {
  res.render('user/register');
};

const registerAndLog = async (req, res) => {
  const { email, password, rePassword, gender } = req.body;
  if (password !== rePassword) {
    throw new Error('You need to confirm passwords!');
  }
  try {
    const user = await userServices.register({ email, password, gender });
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
