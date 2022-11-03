require('dotenv').config()
const express = require('express')
const app = express()
const port = 9001
const cors = require('cors')
const logger = require('morgan');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const processEnvNodeEnv = process.env.NODE_ENV.trim();

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://kvantnolimit.ru']
}))

let mongoUrl

if (processEnvNodeEnv === 'development') {
  mongoUrl = "mongodb://admintiit:" + process.env.MONGO_DEV_PASSWORD + "@localhost:27017/kvantnolimit?authSource=kvantnolimit"
}else {
  mongoUrl = "mongodb://admintiit:" + process.env.MONGO_PRODUCTION_PASSWORD + "@localhost:27017/kvantnolimit?authSource=kvantnolimit"
}

app.use(sessions({
    secret: "nvebiruvwnerfqruec3ce",
    store: MongoStore.create({
        mongoUrl: mongoUrl,
        ttl: 30 * 24 * 60 * 60,
    }),
    resave: false,
    saveUninitialized:false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
    },
}));

const allRouter = require("./routes/all");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

app.use(logger('dev'))
app.use(express.json())
app.use("*", allRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})