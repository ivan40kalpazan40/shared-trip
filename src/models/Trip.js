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

tripSchema.method('isOwner', function (userId) {
  return this.creator._id == userId;
});

tripSchema.method('joined', function (userId) {
  return this.buddies.some((x) => x._id == userId);
});

tripSchema.method('availability', function () {
  return this.seats - this.buddies.length;
});

tripSchema.method('joinTrip', function (user) {
  this.buddies.push(user);
  this.save();
});

tripSchema.method('displayBuddies', function () {
  return this.buddies.map((x) => x.email).join(', ');
});
const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
