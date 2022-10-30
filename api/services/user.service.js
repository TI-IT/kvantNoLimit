const { default: mongoose } = require("mongoose");
const dbConnect = require("./dbConnect")
const User = require('../models/User')


async function save(user) {
  await dbConnect();

  const collection = mongoose.model('users');

  await collection.create({
    email: user.email,
    password: user.password,
    user: 'user' + Date.now(),
    role: 'user'
  })
}

module.exports = {save}