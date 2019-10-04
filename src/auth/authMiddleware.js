const jsonwebtoken = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1]
  try {
    jsonwebtoken.verify(token, process.env.JWT_PRIVATE_KEY)
    next()
  } catch (error) {
    res.status(401).send('Authentication failed')
  }
}
