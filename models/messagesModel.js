const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },  // Reference to the user sending the message
    conversation: [
      {
        messageBySender: { type: String, required: true },  // Message text by sender (user)
        messageByBot: { type: String, required: true },  // Message text by bot
        timestamp: { type: Date, default: Date.now },  // When the message was sent
      },
    ],
    chat_session_id: { type: String, required: false },  // Group messages by a session
  },
  { timestamps: true, collection: "Messages" }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = { Message };
