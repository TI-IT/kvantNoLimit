const express = require('express');
const router = express.Router();
const { save, getAllUsers, deleteAllUsers, getUserByEmailAndPassword, getUserById } = require('../services/user.service');

router.get('/', (req, res) => {
  res.json({ok: true, users: "123"})
})

router.get('/me', async (req, res) => {
  const _id = req.session.user._id;
  const user = await getUserById(_id)
  res.json({ok: true, users: user})
})

router.get('/get/all', async (req, res) => {
  const users = await getAllUsers()
  res.json({ok: true, users: users})
})

router.get('/delete/all', async (req, res) => {
  const users = await deleteAllUsers()
  res.json({ok: true, users: users})
})

router.post('/signup', async (req, res) => {
  const user = req.body;
  console.log(user);
  try {
    await save(user);
    res.json({ok: true});
  }catch (e) {
    console.log(e);
    res.json({ok: false});
  }
})

router.post('/login', async (req, res) => {
  const user = req.body;
  const doc = await getUserByEmailAndPassword(user)

  if(doc) {
    req.session.user = {_id: doc._id}
    req.session.save()
    res.json({ok: true});
  } else {
    res.json({ok: false});
  }
})

router.post('/check/auth', async (req, res) => {
  const _id = req.session.user._id;
  const user = await getUserById(_id)
  
  if(user) {
    res.json({ok: true});
  } else {
    res.json({ok: false});
  }
})

module.exports = router;