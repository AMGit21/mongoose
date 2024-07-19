const mongoose = require("mongoose");

// Function to connect to MongoDB
const dbconnect = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  }
};

module.exports = dbconnect;
