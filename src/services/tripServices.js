const Trip = require('../models/Trip');

const createTrip = (trip) => Trip.create(trip);
const getAll = () => Trip.find({});
const getOne = (id) => Trip.findById(id).populate('creator', 'email');

const tripServices = { createTrip, getAll, getOne };
module.exports = tripServices;
