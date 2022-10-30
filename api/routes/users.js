const express = require('express');
const { addUserToDb, save } = require('../services/user.service');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ok: true, users: "123"})
})

router.post('/signup', async (req, res) => {
  const user = req.body;
  try {
    await save(user)
    res.json({ok: true})
  }catch (e) {
    res.json({ok: false})
  }
})

module.exports = router;