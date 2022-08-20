const router = require('express').Router();
const Movie = require('../models/Movie')
// @desc    Get all movies
// @route   GET /
// @access  Public
router.get('/', async (req, res, next) => {
  // Run 'npm install' and 'npm run dev' and check on Postman if a GET request 
  // to http://localhost:8000/api/v1/movies returns the following response.
  // If it does, you are ready to work!
  try {
    const movies = await Movie.find({});
    if (movies.length === 0) {
      res.status(200).json({ response: 'No movies were found in the database ' });
    } else {
      res.status(200).json({ data: movies })
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Get single movie
// @route   GET /:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json({ response: 'Movie not found' });
    } else {
      res.status(200).json({ data: movie })
    }
  } catch (error) {
    next(error);
  }

});

// @desc    Create a movie
// @route   POST /
// @access  Public
router.post('/', async (req, res, next) => {
  const { title, year, director, duration, synopsis, image } = req.body;
  try {
    const movie = await Movie.create({ title, year, director, duration, synopsis, image });
    res.status(201).json({ data: movie })
  } catch (error) {
    next(error);
  }

});

// @desc    Edit a movie
// @route   PUT /:id
// @access  Public
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { title, year, director, duration, synopsis, image } = req.body;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, { title, year, director, duration, synopsis, image }, { new: true });
    res.status(202).json({ data: updatedMovie })
  } catch (error) {
    next(error);
  }

});

// @desc    Delete a movie
// @route   DELETE /:id
// @access  Public
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await Movie.findByIdAndDelete(id);
    res.status(202).json({ data: deleted });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
