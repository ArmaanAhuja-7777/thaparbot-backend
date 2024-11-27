const { Message } = require("../models/messagesModel");

async function saveMessage(req, res) {
  try {
    const { user_id, messageBySender, messageByBot, chat_session_id } = req.body;
    
    // Check if a conversation exists for this user and session
    let conversation = await Message.findOne({ user_id, chat_session_id });

    if (!conversation) {
      // If no conversation exists, create a new one
      conversation = new Message({
        user_id,
        conversation: [
          {
            messageBySender,
            messageByBot,
            timestamp: new Date(),
          },
        ],
        chat_session_id,
      });
      await conversation.save();
    } else {
      // If conversation exists, push new messages into the array
      conversation.conversation.push({
        messageBySender,
        messageByBot,
        timestamp: new Date(),
      });
      await conversation.save();
    }

    return res.status(200).json({
      message: "Conversation updated successfully",
      data: conversation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error saving message" });
  }
}


async function getMessages(req, res) {
  // Destructure user_id and chat_session_id from the request body
  const { user_id } = req.body; // Accepting data in the request body
  
  try {
    // Search for the conversation based on user_id and chat_session_id
    const conversation = await Message.findOne({ user_id });
    
    if (!conversation) {
      // If no conversation is found, return a 404 error
      return res.status(404).json({ message: "Conversation not found" });
    }
    
    // If conversation is found, return the conversation data
    return res.json({ conversation: conversation.conversation });
    
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    return res.status(500).json({ error: "Error retrieving messages" });
  }
}

module.exports = { saveMessage, getMessages};
