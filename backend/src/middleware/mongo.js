const { isDatabaseConnected } = require("../config/db");

function requireMongo(_req, res, next) {
  if (!isDatabaseConnected()) {
    return res.status(503).json({
      message: "MongoDB is not connected. Set MONGODB_URI and restart the API.",
    });
  }
  return next();
}

module.exports = { requireMongo };
