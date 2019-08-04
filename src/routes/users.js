const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.post('/signup', async (req, res, next) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      email: req.body.email,
      password: encryptedPassword
    })
    await user.save()
    res.status(201).send()
  } catch (error) {
    next(error)
  }
})

module.exports = router
