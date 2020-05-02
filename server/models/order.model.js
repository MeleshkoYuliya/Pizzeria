const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  name:{
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  flat:{
    type: Number,
    required: true,
  },
  floor:{
    type: Number,
    required: true,
  },
  payment: {
    type: String,
  },
  pizzas: [
    {
      name: {
        type: String
      },
      quantity: {
        type: Number
      },
      cost: {
        type: Number
      }
    }
  ],
  totalPrice:{
    type: Number,
    required:true,
  },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('orders', orderSchema)