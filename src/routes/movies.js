const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie')

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

module.exports = router
