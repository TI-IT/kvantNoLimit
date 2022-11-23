const express = require('express');
const { addUserToDb } = require('../services/users.service');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({OK: true, users: "123"})
})

router.get('/signup', async (req, res) => {

  await addUserToDb();

  res.json({OK: true, user: req.params.id})
})

module.exports = router;