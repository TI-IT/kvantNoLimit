const express = require('express');
const router = express.Router();
const axios = require('axios')
const {google} = require('googleapis');
// const {getUserByEmail, save} = require("../services/users.service");
// const User = require('../models/User');

const oauth2Client = new google.auth.OAuth2(
  "325505659947-rdvbrfnlmbpombaa9fq309n3179ovdgp.apps.googleusercontent.com",
  "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",
  "https://kvantnolimit.ru/oauth/google/redirect"
)

const scopes = [
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
        headers: {'Authorization': 'Bearer ' + tokens.access_token, "Content-Type": "application/json"},
    })

  let user = response.data
  console.log("*****************===============******************")
  console.log(user)

  res.json({ok: true})
})

module.exports = router;