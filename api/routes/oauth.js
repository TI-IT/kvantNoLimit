const express = require('express');
const router = express.Router();
const axios = require('axios')
const {google} = require('googleapis');
const { getUserByEmail } = require('../services/users.service');
// const {getUserByEmail, save} = require("../services/users.service");
// const User = require('../models/User');

const oauth2Client = new google.auth.OAuth2(
  "714814350407-9d4abgvdab3soshdn8lm41l4i1kfibd7.apps.googleusercontent.com",
  "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",
  "https://kvantnolimit.ru/oauth/google/redirect"
)

const scopes = [
    'profile email',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
];


router.get('/google', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    })
    res.redirect(url)
})

router.get('/google/redirect', async (req, res) => {

    const code = req.query.code

    const {tokens} = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens);

    const response = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {'Authorization': 'Bearer ' + tokens.access_token, "Content-Type": "application/json; charset=UTF-8"}
    })

    

  console.log("**********=======%%%%%%%%%%%%%%%%%%%%%%%%%==========********************************")
  let user = response.data
  console.log("**********=======%%%%%%%%%%%%%%%%%%%%%%%%%==========********************************")
  console.log(user)
  
  const foundUser = await getUserByEmail(user.email)

  console.log("**********=================********************************")
  console.log(user.email)

  res.json({ok: true})
})

module.exports = router;