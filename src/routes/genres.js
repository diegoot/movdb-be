const express = require('express')
const router = express.Router()
const Genre = require('../models/Genre')

// It retrieves all genres
router.get('/', async (req, res, next) => {
  try {
    const genres = await Genre.find()
    res.send(genres)
  } catch (error) {
    next(error)
  }
})

// It creates a genre
router.post('/', async (req, res, next) => {
  const genre = new Genre({ name: req.body.name })
  try {
    await genre.save()
    res.status(201).send()
  } catch (error) {
    next(error)
  }
})

module.exports = router
