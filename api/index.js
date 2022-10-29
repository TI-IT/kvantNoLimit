const express = require('express')
const app = express()
const port = 9001

app.get('/', (req, res) => {
  res.send('<h1>' + 'velcom to KvantNoLimit' + '</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})