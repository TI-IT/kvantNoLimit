const dcConnect = require("./dbConnect");
const mongoose = require("mongoose");
const User = require('../models/User');
const dbConnect = require("./dbConnect");

async function save(user){
  await dcConnect();
  const collection = mongoose.model('users');

  const username = 'user' + new Date().getTime()

  const result = await collection.create({
    email: user.email,
    password: user.password,
    username: username,
    role: 'user'
  })

  return result
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

async function getUserById(_id, isAdmin) {
await dbConnect();
const collection = mongoose.model('users');
let user = await collection.findOne({_id: _id});

if (isAdmin) {
  user = await collection.findOne({_id: _id});
}else {
  user = await collection.findOne({_id: _id}, {password: 0, email: 0});
}
return user
}

async function updateUser(user) {

  await dbConnect();
  const collection = mongoose.model('users');
  const doc = await collection.findOne({_id: user._id});
  
  doc['username'] = user.username
  doc['name'] = user.name
  doc['birthday'] = user.birthday
  doc['about'] = user.about

  console.log(doc)
  await doc.save()
  return doc
}


async function getUserByEmail(email) {
await dbConnect();
const collection = mongoose.model('users');
const user = await collection.findOne({email: email});
return user
}
module.exports = {save, getAllUsers, deleteAllUsers, getUserByEmailAndPassword, getUserById, updateUser, getUserByEmail};