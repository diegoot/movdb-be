const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true,
    match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  },
  genre: {
    type: [String],
    required: true
  },
  synopsis: {
    type: String,
    required: true
  }
})

movieSchema.plugin(timestamp)

module.exports = mongoose.model('Movie', movieSchema)
