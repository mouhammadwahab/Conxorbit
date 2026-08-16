const mongoose = require("mongoose");

const stateLabel = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

let listenersAttached = false;

function attachConnectionListeners() {
  if (listenersAttached) return;
  listenersAttached = true;

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
  });
}

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.warn("MONGODB_URI is not set. Database connection skipped.");
    return false;
  }

  attachConnectionListeners();

  if (mongoose.connection.readyState === 1) return true;
  if (mongoose.connection.readyState === 2) return true;

  await mongoose.connect(mongoUri);
  return true;
}

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

async function checkDatabaseConnection() {
  const state = mongoose.connection.readyState;
  const connected = state === 1;

  if (!connected) {
    return {
      connected: false,
      state,
      stateText: stateLabel[state] || "unknown",
    };
  }

  try {
    await mongoose.connection.db.admin().ping();
    return {
      connected: true,
      state,
      stateText: stateLabel[state],
    };
  } catch (error) {
    return {
      connected: false,
      state,
      stateText: "ping-failed",
      message: error.message,
    };
  }
}

module.exports = {
  connectDB,
  isDatabaseConnected,
  checkDatabaseConnection,
};
