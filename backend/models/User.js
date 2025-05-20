const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  favouriteMovies: {
    type: [Number], // Storing movie IDs (assumed to be numbers from the API)
    default: []
  },
  maybeMovies: {
    type: [Number],
    default: []
  },
  badMovies: {
    type: [Number],
    default: []
  },
  watchedMovies: {
    type: [Number],
    default: []
  }
});

module.exports = mongoose.model('User', userSchema);