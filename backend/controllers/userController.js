const User = require('../models/User');

// GET current user's movies
exports.getUserMovies = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      favouriteMovies: user.favouriteMovies || [],
      maybeMovies: user.maybeMovies || [],
      badMovies: user.badMovies || [],
      watchedMovies: user.watchedMovies || [],
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get movies', error: err.message });
  }
};

// PUT update current user's movies
exports.updateUserMovies = async (req, res) => {
  try {
    const { favouriteMovies, maybeMovies, badMovies, watchedMovies } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        favouriteMovies,
        maybeMovies,
        badMovies,
        watchedMovies,
      },
      { new: true }
    );

    res.json({ message: 'Movie lists updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update movies', error: err.message });
  }
};