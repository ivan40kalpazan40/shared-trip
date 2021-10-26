const router = require('express').Router();

const renderHome = (req, res) => {
 // console.log(req.cookies['tokenCookie']);
  res.render('index');
};

router.get('/', renderHome);

module.exports = router;
