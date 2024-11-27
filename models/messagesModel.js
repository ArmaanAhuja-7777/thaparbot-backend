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
  },
  { timestamps: true, collection: "Messages" }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = { Message };
