require('dotenv').config()
const express = require('express')
const app = express()
const port = 9001
const cors = require('cors')
const logger = require('morgan')
const MongoStore = require('connect-mongo')
const session = require('express-session')

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'https://kvantnolimit.ru']
}))

let mongoUrl
if (process.env.NODE_ENV === "development ") {
  mongoUrl = "mongodb://admintiit:" + process.env.MONGO_DEV_PASSWORD + "@127.0.0.1:27017/kvantnolimit?authSource=kvantnolimit"
} else {
  mongoUrl = "mongodb://admintiit:" + process.env.MONGO_PRODUCTION_PASSWORD + "@127.0.0.1:27017/kvantnolimit?authSource=kvantnolimit"
}

app.use(session({
  secret: "hnkjhjuhghhjgkjhkjh",
  store: MongoStore.create({
    mongoUrl: mongoUrl,
    ttl: 30 * 24 * 60 * 60,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
}));

const allRouter = require("./routes/all");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const oauthRouter = require("./routes/oauth");

//пути для express
app.use(logger('dev'))
app.use(express.json())
app.use('*', allRouter)
app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/oauth", oauthRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log("Hello server")