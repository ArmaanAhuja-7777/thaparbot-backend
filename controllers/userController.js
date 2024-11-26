const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// You should store this in .env

// Function to register user
async function registerUser(req, res) {
  const { user_id, name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists with this email." });
  }

  // Create new user
  const user = new User({ user_id, name, email, password });
  console.log(user); 
  await user.save();

  // Generate JWT token
  const token = jwt.sign({ user_id: user.user_id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

  res.status(201).json({
    message: "User registered successfully.",
    token,  // Return the token to be saved in localStorage
  });
}

// Function to log in user
async function loginUser(req, res) {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "User not found with this email." });
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credentials." });
  }

  // Generate JWT token
  const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({
    message: "Login successful.",
    token,  // Return the token to be saved in localStorage
  });
}

module.exports = { registerUser, loginUser };
