const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const { getUserByEmail, save } = require('../services/users.service');
const User = require('../models/User');

const oauth2Client = new google.auth.OAuth2(
  "714814350407-9d4abgvdab3soshdn8lm41l4i1kfibd7.apps.googleusercontent.com",
  "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",
  "https://api.kvantnolimit.ru/oauth/google/redirect"
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
    const response = fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        method: 'get',
        headers: {'Authorization': 'Bearer ' + tokens.access_token, "Content-Type": "application/json; charset=UTF-8"}
    }).then(res)
    let user = (await response).json()
    console.log(user.name)
    const foundUser = await getUserByEmail(user.email)
    let _id;

    if (foundUser) {
      _id = foundUser._id
    }else {
      const newUser = new User({
        email: user.email,
        password: btoa(new Date())
      }
    )
    const saveUser = await save(newUser)
    _id = saveUser._id
  }

  req.session.user = {_id: _id}
  await req.session.save()

  res.redirect("https://kvantnolimit.ru/dashboard")
})


module.exports = router;