const dcConnect = require("./dbConnect");
const mongoose = require("mongoose");
const User = require('../models/User');
const dbConnect = require("./dbConnect");

async function save(user){
  await dcConnect();

  const collection = mongoose.model('users');

  const username = 'user' + new Date().getTime()
  await collection.create({
    email: user.email,
    password: user.password,
    username: username,
    role: 'user'
  })
}

async function getAllUsers() {
  await dbConnect();
  const collection = mongoose.model('users');
  const users = await collection.find({})
  return users
}

async function deleteAllUsers() {
  await dbConnect();
  const collection = mongoose.model('users');
  const users = await collection.deleteMany({})
}

async function getUserByEmailAndPassword(user) {
  console.log(user)
  await dbConnect();
  const collection = mongoose.model('users');
  const doc = await collection.findOne({email: user.email, password: user.password})
  return doc
}

module.exports = {save, getAllUsers, deleteAllUsers, getUserByEmailAndPassword};