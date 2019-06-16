const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie')

// It retrieves all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find()
    res.send(movies)
  } catch (error) {
    console.error(error)
    res.status(500).send()
  }
})

// It retrieves a single movie
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    res.send(movie)
  } catch (error) {
    console.error(error)
    res.status(500).send()
  }
})

// It creates a new movie
router.post('/', async (req, res) => {
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
    console.error(error)
    res.status(500).send()
  }
})

// It deletes a movie
router.delete('/:id', async (req, res) => {
  try {
    const result = await Movie.deleteOne({ _id: req.params.id })
    if (result.deletedCount !== 1) {
      const error = new Error('Movie not found')
      error.statusCode = 404
      throw error
    }
  } catch (error) {
    console.error(error)
    res.status(error.statusCode || 500).send(error.message)
  }
})

module.exports = router
