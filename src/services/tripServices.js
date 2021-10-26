const Trip = require('../models/Trip');

const createTrip = (trip) => Trip.create(trip);
const getAll = () => Trip.find({});
const getOne = (id) => Trip.findById(id).populate('creator', 'email');
const updateTrip = (id, update) => Trip.findByIdAndUpdate(id, update);

const tripServices = { createTrip, getAll, getOne, updateTrip };
module.exports = tripServices;
