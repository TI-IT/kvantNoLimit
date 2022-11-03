const express = require('express');
const router = express.Router();
const processEnvNodeEnv = process.env.NODE_ENV.trim();

router.all("*", (req, res, next) => {

    let domain = processEnvNodeEnv === 'development' ? process.env.DEV_HOST : process.env.PROD_HOST
    res.setHeader('Access-Control-Allow-Origin', domain);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next()

})

module.exports = router