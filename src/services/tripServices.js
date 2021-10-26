const Trip = require('../models/Trip');

const createTrip = (trip) => Trip.create(trip);
const getAll = () => Trip.find({});
const getOne = (id) =>
  Trip.findById(id).populate('creator buddies', 'email');
const updateTrip = (id, update) => Trip.findByIdAndUpdate(id, update);
const removeTrip = (id) => Trip.findByIdAndDelete(id);

const tripServices = { createTrip, getAll, getOne, updateTrip, removeTrip };
module.exports = tripServices;
