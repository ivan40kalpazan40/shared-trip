const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const tripController = require('./controllers/tripController');
router.use(homeController);
router.use('/user', userController);
router.use('/trip', tripController);
module.exports = router;
