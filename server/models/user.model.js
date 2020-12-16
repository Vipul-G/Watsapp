const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  uid: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true},
  photoURL: { type: String}
});

module.exports = mongoose.model('users', userSchema);