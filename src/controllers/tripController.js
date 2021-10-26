const router = require('express').Router();
const { isLogged } = require('../middleware/authMiddleware');
const tripServices = require('../services/tripServices');

const displayTrips = (req, res) => {
  res.render('trip/shared');
};

const renderCreate = (req, res) => {
  res.render('trip/create');
};

const createTrip = async (req, res) => {
  const { start, end, date, time, image, brand, seats, price, description } =
    req.body;
  const creator = req.user;
  try {
    const trip = await tripServices.createTrip({
      start,
      end,
      date,
      time,
      image,
      brand,
      seats,
      price,
      description,
      creator,
    });
    res.redirect('/trip/all');
  } catch (error) {
    console.log(error.message);
    res.render('404');
  }
};

router.get('/all', displayTrips);
router.get('/create', isLogged, renderCreate);
router.post('/create', isLogged, createTrip);

module.exports = router;
