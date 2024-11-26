const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://armaanahuja7777:armaanahuja7777@thapar-chatbot.4scx3.mongodb.net/?retryWrites=true&w=majority&appName=thapar-chatbot");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
