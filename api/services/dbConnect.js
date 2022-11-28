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
    pass: "Tg30121986",
    auth: {authSource: "kvantnolimit"}
  }

  return mongoose.connect(url, options, (e) => {
    console.error(e)
  });
}
module.exports = dbConnect;