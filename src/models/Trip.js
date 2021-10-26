const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  start: { type: String, required: true },
  end: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, ref: 'User' },
  buddies: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

tripSchema.method('isCreator', function (userId) {
  return this.creator._id == userId;
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
