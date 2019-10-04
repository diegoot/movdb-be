const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie')
const authMiddleware = require('../auth/authMiddleware')

// It retrieves all movies
router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find()
    res.send(movies)
  } catch (error) {
    next(error)
  }
})

// It retrieves a single movie
router.get('/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id)
    res.send(movie)
  } catch (error) {
    next(error)
  }
})

// It retrieves the N most recent movies
router.get('/:n/mostrecent', async (req, res, next) => {
  try {
    const movies = await Movie.find()
      .sort({ year: -1 })
      .limit(+req.params.n)
    res.send(movies)
  } catch (error) {
    next(error)
  }
})

// It retrieves all movies for a genre
router.get('/forgenre/:genre', async (req, res, next) => {
  try {
    const movies = await Movie.find({ genre: req.params.genre })
    res.send(movies)
  } catch (error) {
    next(error)
  }
})

// It creates a new movie
router.post('/', authMiddleware, async (req, res, next) => {
  const { title, year, director, poster, genre, synopsis } = req.body
  const movie = new Movie({
    title,
    year,
    director,
    poster,
    genre,
    synopsis
  })
  try {
    await movie.save()
    res.status(201).send()
  } catch (error) {
    next(error)
  }
})

// It updates a movie
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body.update,
      { new: true }
    )
    res.send(movie)
  } catch (error) {
    next(error)
  }
})

// It deletes a movie
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const result = await Movie.deleteOne({ _id: req.params.id })
    if (result.deletedCount !== 1) {
      const error = new Error('Movie not found')
      error.statusCode = 404
      throw error
    }
    res.send()
  } catch (error) {
    next(error)
  }
})

module.exports = router
