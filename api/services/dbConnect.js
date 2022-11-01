const mongoose = require("mongoose");

const dbName = "kvantnolimit";

async function dbConnect() {
  if(mongoose.connection.readyState == 1) {
    return mongoose.connection.db;
  }

  let url = `mongodb://localhost:27017/${dbName}`;
  let options = {
    user: "admintiit",
    pass: process.env.NODE_ENV === 'development' ? MONGO_DEV_PASSWORD : MONGO_PRODUCTION_PASSWORD,
    // pass: process.env.NODE_ENV === 'development' ? MONGO_PRODUCTION_PASSWORD : MONGO_DEV_PASSWORD,
    auth: {authSource: `${dbName}`}
  }

  return mongoose.connect(url, options, (e)=> {
    console.error(e)
  });
}
module.exports = dbConnect;