const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

genreSchema.plugin(timestamp)

module.exports = mongoose.model('Genre', genreSchema)
