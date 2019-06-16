const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const moviesRoutes = require('./routes/movies')

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

app.use('/movies', moviesRoutes)

app.use('/', (req, res, next) => {
  res.send('I am working')
})

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
})
