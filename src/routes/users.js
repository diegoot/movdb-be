const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user === null) {
      res.status(401).send('Authentication failed')
      return
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordValid) {
      res.status(401).send('Authentication failed')
      return
    }
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: '1h' }
    )
    res.send({ token: `Bearer ${token}` })
  } catch (error) {
    next(error)
  }
})

module.exports = router
