const dcConnect = require("./dbConnect");
const mongoose = require("mongoose");
const User = require('../models/User')

async function addUserToDb(){
  await dcConnect();

  const collection = mongoose.model('users');

  await collection.create({
    username: "vwwwasya",
    password: "123456",
    role: 'user'
  })
}
module.exports = {addUserToDb};