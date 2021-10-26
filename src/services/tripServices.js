const Trip = require('../models/Trip');

const createTrip = (trip) => Trip.create(trip);
const getAll = () => Trip.find({}).lean();

const tripServices = { createTrip, getAll };
module.exports = tripServices;
