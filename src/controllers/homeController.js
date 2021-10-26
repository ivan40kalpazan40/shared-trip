const router = require('express').Router();

const renderHome = (req, res) => {
  res.render('index');
};

router.get('/', renderHome);

module.exports = router;
