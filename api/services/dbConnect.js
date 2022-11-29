const mongoose = require("mongoose");

async function dbConnect() {
  if(mongoose.connection.readyState == 1){
    console.log("Соединение с MongoDb существует")
    return mongoose.connection.db;
  }

  console.log("Соединение с MongoDb устанавливается")
  let url = "mongodb://127.0.0.1:27017/kvantnolimit";
  let options = {
    user: "admintiit",
    pass: process.env.NODE_ENV === "development " ? process.env.MONGO_DEV_PASSWORD : process.env.MONGO_PRODUCTION_PASSWORD,
    auth: {authSource: "kvantnolimit"}
  }

  return mongoose.connect(url, options, (e) => {
    console.error(e)
  });
}
module.exports = dbConnect;