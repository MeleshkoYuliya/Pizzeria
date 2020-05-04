const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pizzaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    default: ''
  },
  ingredients: [
    {
      type: String,
      default: ''
    },
  ],
  info: [
    {
      price: {
      type: Number,
      required: true
      },
      size: {
        type: Number,
        required: true
      }
    }
  ],
  nutricion:{
    protein:{
      type: Number,
    },
    fats: {
      type: Number,
    },
    carbohydrates: {
      type: Number,
    },
    energy:{
      type: Number,

    }
  }
})

module.exports = mongoose.model('pizzas', pizzaSchema)