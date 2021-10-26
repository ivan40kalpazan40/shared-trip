const router = require('express').Router();
const { isLogged } = require('../middleware/authMiddleware');
const tripServices = require('../services/tripServices');

const displayTrips = async (req, res) => {
  try {
    const trips = await await tripServices.getAll();
    const tripList = trips.map((x) => x.toObject());
    res.render('trip/shared', { trips: tripList });
  } catch (error) {
    console.log(error.message);
    res.render('404');
  }
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

const renderDetails = async (req, res) => {
  const tripId = req.params.id;

  try {
    const trip = await tripServices.getOne(tripId);
    const isOwner = trip.isCreator(req.user._id);
    res.render('trip/details', { isOwner, trip: trip.toObject() });
  } catch (error) {
    console.log(error.message);
    res.render('404');
  }
};

const renderEdit = async (req, res) => {
  const tripId = req.params.id;
  try {
    const trip = await tripServices.getOne(tripId);
    res.render('trip/edit', { trip: trip.toObject() });
  } catch (error) {
    console.log(error.message);
    res.render('404');
  }
};

const editTrip = async (req, res) => {
  const tripId = req.params.id;
  const update = { ...req.body };
  try {
    const trip = await tripServices.updateTrip(tripId, update);
    res.redirect(`/trip/${tripId}/details`);
  } catch (error) {
    console.log(error.message);
    res.render('404');
  }
};

router.get('/all', displayTrips);
router.get('/create', isLogged, renderCreate);
router.post('/create', isLogged, createTrip);
router.get('/:id/details', renderDetails);
router.get('/:id/edit', isLogged, renderEdit);
router.post('/:id/edit', isLogged, editTrip);

module.exports = router;
