const express = require('express')

const app = express()

const port = 3014

app.use('/', (req, res, next) => {
  res.send('I am working')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
