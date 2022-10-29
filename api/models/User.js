const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schema = new Schema({
  password: {
    type: String
  },
  username: {
    type: String
  }
}, {autoCreate: true})

const User = mongoose.model('user', schema)
model.exports = User