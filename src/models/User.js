const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: [true, 'User is already registered!'] },
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  tripsHistory: [{ type: mongoose.Types.ObjectId, ref: 'Trip' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
