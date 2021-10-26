const Trip = require('../models/Trip');

const createTrip = (trip) => Trip.create(trip);

const tripServices = { createTrip };
module.exports = tripServices;
