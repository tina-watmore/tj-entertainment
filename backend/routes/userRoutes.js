const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUserMovies, updateUserMovies } = require('../controllers/userController');

// GET /api/user/movies
router.get('/movies', auth, getUserMovies);

// PUT /api/user/movies
router.put('/movies', auth, updateUserMovies);

module.exports = router;