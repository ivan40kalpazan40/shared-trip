const router = require('express').Router();
const {
  isLogged,
  isCreator,
  notCreator,
} = require('../middleware/authMiddleware');
const tripServices = require('../services/tripServices');
const userServices = require('../services/userServices');

const displayTrips = async (req, res) => {
  try {
    const trips = await await tripServices.getAll();
    const tripList = trips.map((x) => x.toObject());
    res.render('trip/shared', { trips: tripList });
  } catch (error) {
    console.log(error.message);
    res.locals.error = error.message;
    res.render('404', { error: res.locals.error });
  }
};

const renderCreate = (req, res) => {
  res.render('trip/create');
};

const createTrip = async (req, res) => {
  const { start, end, date, time, image, brand, seats, price, description } =
    req.body;

  try {
    const user = await userServices.getUser(req.user._id);
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
      creator: user,
    });
    await user.addToHistory(trip);
    res.redirect('/trip/all');
  } catch (error) {
    console.log(error.message);
    res.locals.error = error.message;
    res.render('404', { error: res.locals.error });
  }
};

const renderDetails = async (req, res) => {
  const tripId = req.params.id;

  try {
    const trip = await tripServices.getOne(tripId);
    const isOwner = trip.isOwner(req.user?._id);
    const isJoined = trip.joined(req.user?._id);
    const availability = trip.availability();
    const displayBuddies = trip.displayBuddies();
    res.render('trip/details', {
      availability,
      displayBuddies,
      isOwner,
      isJoined,
      trip: trip.toObject(),
    });
  } catch (error) {
    console.log(error.message);
    res.locals.error = error.message;
    res.render('404', { error: res.locals.error });
  }
};

const renderEdit = async (req, res) => {
  const tripId = req.params.id;
  try {
    const trip = await tripServices.getOne(tripId);
    res.render('trip/edit', { trip: trip.toObject() });
  } catch (error) {
    console.log(error.message);
    res.locals.error = error.message;
    res.render('404', { error: res.locals.error });
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
    res.locals.error = error.message;
    res.render('404', { error: res.locals.error });
  }
};

const deleteTrip = async (req, res) => {
  const tripId = req.params.id;
  try {
    await tripServices.removeTrip(tripId);
    res.redirect('/trip/all');
  } catch (error) {
    console.log(error.message);
    res.locals.error = error.message;
    res.render('404', { error: res.locals.error });
  }
};

const joinTrip = async (req, res) => {
  const tripId = req.params.id;
  try {
    const trip = await tripServices.getOne(tripId);
    const isJoined = trip.joined(req.user?._id);
    if (!isJoined) {
      await trip.joinTrip(req.user);
      res.redirect(`/trip/${tripId}/details`);
    } else {
      throw new Error('You already joined this trip!');
    }
  } catch (error) {
    console.log(error.message);
    res.locals.error = error.message;
    res.render('404', { error: res.locals.error });
  }
};

router.get('/all', displayTrips);
router.get('/create', isLogged, renderCreate);
router.post('/create', isLogged, createTrip);
router.get('/:id/details', renderDetails);
router.get('/:id/edit', isLogged, isCreator, renderEdit);
router.post('/:id/edit', isLogged, isCreator, editTrip);
router.get('/:id/delete', isLogged, isCreator, deleteTrip);
router.get('/:id/join', isLogged, notCreator, joinTrip);

module.exports = router;
