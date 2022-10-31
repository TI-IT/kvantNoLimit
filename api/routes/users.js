const express = require('express');
const router = express.Router();
const { save, getAllUsers, deleteAllUsers } = require('../services/user.service');

router.get('/', (req, res) => {
  res.json({ok: true, users: "123"})
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

module.exports = router;