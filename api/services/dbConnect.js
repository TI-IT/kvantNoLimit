const mongoose = require("mongoose");

async function dbConnect() {
  if(mongoose.connection.readyState == 1){
    return mongoose.connection.db;
  }

  let url = "mongodb://localhost:27017/kvantnolimit";
  let options = {
    user: "admintiit",
    pass: "Tg30121986",
    auth: {authSource: "kvantnolimit"}
  }

  return mongoose.connect(url, options, (e) => {
    console.error(e)
  });
}
module.exports = dbConnect;