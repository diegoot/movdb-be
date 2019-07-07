const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const moviesRoutes = require('./routes/movies')
const genresRoutes = require('./routes/genres')

const app = express()
const dbConnection = mongoose.connection
const envConfig = dotenv.config()

if (envConfig.error) {
  console.error(envConfig.error)
  process.exist(1)
}

dbConnection.on('error', error => {
  console.error(error)
  process.exit(1)
})

dbConnection.once('open', () => {
  console.log(`Listening on port ${process.env.PORT}`)
})

app.use(cors())
app.use(bodyParser.json())

app.use('/movies', moviesRoutes)
app.use('/genres', genresRoutes)

app.use(function(req, res, next) {
  const error = new Error('Not Found')
  error.statusCode = 404
  next(error)
})

// If I do not add next as parameter it is not executed
app.use((error, req, res, next) => {
  console.error(error.stack)
  const code = error.statusCode || 500
  res
    .status(code)
    .send({ message: error.message || 'Internal Server Error', code })
})

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
})
