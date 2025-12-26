//Import required Mongoose package
const mongoose = require("mongoose");
require("dotenv").config();

//Connects the app to the database using the Mongoose ODM library
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/quickBasket"
);

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB connected to:", mongoose.connection.name);
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});
console.log("🔎 MONGODB_URI =", process.env.MONGODB_URI);

module.exports = mongoose.connection;
