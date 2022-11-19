const express = require('express')
const app = express()
const port = 9001

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

//пути для express
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})