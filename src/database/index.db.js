const mongoose = require("mongoose");

const mongodb_url = process.env.MONGODB_URL;

async function connectToDb() {
  try {
    await mongoose.connect(mongodb_url);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectToDb;
