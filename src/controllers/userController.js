const router = require('express').Router();

const renderRegister = (req, res) => {
  res.render('user/register');
};

const renderLogin = (req, res) => {
  res.render('user/login');
};

router.get('/register', renderRegister);
router.get('/login', renderLogin);
module.exports = router;
