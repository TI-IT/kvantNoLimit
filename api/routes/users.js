const express = require('express');
const router = express.Router();
const { save, getAllUsers, deleteAllUsers, getUserByEmailAndPassword, getUserById, updateUser } = require('../services/user.service');

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
    const doc = await getUserByEmailAndPassword(user);
    req.session.user = {_id: doc._id};
    req.session.save();
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

router.get('/logout', async (req, res) => {
  const domain = process.env.NODE_ENV === 'development' ? process.env.DEV_HOST : process.env.PROD_HOST
  // const domain = process.env.NODE_ENV === 'development' ? process.env.PROD_HOST : process.env.DEV_HOST

  req.session.destroy()
  res.clearCookie('connect.sid', {path: "/"})

  res.redirect(domain)
})

router.post('/check/auth', async (req, res) => {
  if(!req.session.user) {
    res.json({ok: false}).end()
    return
  }
  const _id = req.session.user._id;
  const user = await getUserById(_id)
  
  if(user) {
    res.json({ok: true, role: user.role});
  } else {
    res.json({ok: false});
  }
})

router.post('/update', async (req, res) => {
  if(!req.session.user) {
    res.json({ok: false}).end()
    return
  }
  const _id = req.session.user._id;
  const user = await getUserById(_id)

  const updatedUser = await updateUser(req.body)

  console.log(updatedUser)
  
  if(user) {
    res.json({ok: true});
  } else {
    res.json({ok: false});
  }
})

module.exports = router;