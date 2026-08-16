const { connectDB } = require("./db");

async function connectMongo() {
  return connectDB();
}

module.exports = {
  connectMongo,
};
