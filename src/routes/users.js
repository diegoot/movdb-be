const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: it creates a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     description: it creates a user with a given email and password
 *     responses:
 *       201:
 *         description: the user was created
 */
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

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: it logins a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     description: it logins a user based on an email and a password
 *     responses:
 *       200:
 *         description: user logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: authentication token
 *       401:
 *         description: authentication failed
 */
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
