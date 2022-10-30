const { default: mongoose } = require("mongoose");
const dbConnect = require("./dbConnect")
const User = require('../models/User')


async function addUserToDb() {
  await dbConnect();

  const collection = mongoose.model('users');

  await collection.create({
    username: "Tigran3",
    password: "123456",
    role: 'user'
  })
}

module.exports = {addUserToDb}