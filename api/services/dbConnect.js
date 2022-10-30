const mongoose = require("mongoose");

const dbName = "kvantnolimit";

async function dbConnect() {
  if(mongoose.connection.readyState == 1) {
    return mongoose.connection.db;
  }

  let url = `mongodb://localhost:27017/${dbName}`;
  let options = {
    user: "admintiit",
    pass: "Tg30121986",
    auth: {authSource: `${dbName}`}
  }

  return mongoose.connect(url, options, (e)=> {
    console.error(e)
  });
}
module.exports = dbConnect;