const { default: mongoose } = require("mongoose");
const dbConnect = require("./dbConnect")
const User = require('../models/User')


async function save(user) {
  await dbConnect();

  const collection = mongoose.model('users');

  const username ='user' + new Date().getTime();

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
  console.log(users)
  return users
}

async function getUserByEmailAndPassword(user) {
  await dbConnect();
  const collection = mongoose.model('users');
  const doc = await collection.findOne({email: user.email, password: user.password})
  return doc
}

async function getUserById(_id) {
  await dbConnect();
  const collection = mongoose.model('users');
  const user = await collection.findOne({_id: _id})
  return user
}
async function updateUser(user) {
  await dbConnect();
  const collection = mongoose.model('users');
  const doc = await collection.findOne({_id: user._id})
  
  doc['username'] = user.username

  await doc.save()
  return doc
}

async function deleteAllUsers() {
  await dbConnect();
  const collection = mongoose.model('users');
  const users = await collection.deleteMany({})
}

module.exports = {save, getAllUsers, deleteAllUsers, getUserByEmailAndPassword, getUserById, updateUser}