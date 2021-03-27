const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  averageCovidRating: {
    type: Number,
    default: 0
  },
  fourSquareCategory: {
    type: String
  },
  fourSquareId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  covidRating: [
    {
      rating: {
        min: 0,
        max: 5,
        type: Number
      }
    }
  ],
  comments: [
    {
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

module.exports = Location = mongoose.model('location', LocationSchema);
