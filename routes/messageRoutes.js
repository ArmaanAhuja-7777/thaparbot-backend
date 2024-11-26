const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Route to save a new message from the user and the bot's response
router.post('/save', messageController.saveMessage);

// Route to get all messages for a user or chat session
router.post('/get', messageController.getMessages);

module.exports = router;
