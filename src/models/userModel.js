const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
  name: String,
  lastname: String,
  age: Number,
  email: {
    type: String,
    unique:true,
    
  },
  password: String,
  role: String,
  createdAt: Date,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts'
  }
})
module.exports  = mongoose.model('users', userShema)