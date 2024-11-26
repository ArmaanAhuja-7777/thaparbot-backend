const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require('./routes/messageRoutes'); 
const chatbotRoutes = require('./routes/chatbotRoutes');
const app = express();
const cors = require("cors");
const port = 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB();

// Use chatbot routes
app.use('/api/messages', messageRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
