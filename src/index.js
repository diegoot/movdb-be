const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const moviesRoutes = require('./routes/movies')
const genresRoutes = require('./routes/genres')
const usersRoutes = require('./routes/users')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

try {
  main()
} catch (error) {
  console.error(error)
  process.exit(1)
}

async function main() {
  dotenv.config()

  // Swagger setup
  const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0'
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}`,
          description: 'Development server'
        }
      ]
    },
    apis: ['src/routes/*.js']
  }

  const swaggerSpec = swaggerJSDoc(options)

  // Handle DB errors after initial connection
  mongoose.connection.on('error', error => {
    console.error(error)
    process.exit(1)
  })

  // Connect to DB
  await mongoose.connect(process.env.DB_URL)

  // Create an express app
  const app = express()

  // Setup app before running the server

  // Middlewares
  app.use(cors())
  app.use(express.json())

  //  Routes
  app.use('/movies', moviesRoutes)
  app.use('/genres', genresRoutes)
  app.use('/users', usersRoutes)
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Not found route middleware
  app.use(function(req, res, next) {
    const error = new Error('Not Found')
    error.statusCode = 404
    next(error)
  })

  // Error middleware
  app.use((error, req, res, next) => {
    console.error(error.stack)
    const code = error.statusCode || 500
    res
      .status(code)
      .send({ message: error.message || 'Internal Server Error', code })
  })

  // Start the server
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
  })
}
