require('dotenv').config()
const express = require('express')
const app = express()
const port = 9001
const cors = require('cors')

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://kvantnolimit.ru']
}))

const allRouter = require("./routes/all");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");


app.use(express.json())
app.use("*", allRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})