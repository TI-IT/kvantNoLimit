const mongoose = require("mongoose");
const dbName = "kvantnolimit";
const processEnvNodeEnv = process.env.NODE_ENV.trim();

async function dbConnect() {
  if(mongoose.connection.readyState == 1) {
    return mongoose.connection.db;
  }

  let url = `mongodb://localhost:27017/${dbName}`;
  let options = {
    user: "admintiit",
    pass: processEnvNodeEnv === 'development' ? process.env.MONGO_DEV_PASSWORD : process.env.MONGO_PRODUCTION_PASSWORD,
    auth: {authSource: `${dbName}`}
  }

  return mongoose.connect(url, options, (e)=> {
    console.error(e)
  });
}
module.exports = dbConnect;