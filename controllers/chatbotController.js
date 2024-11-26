const axios = require('axios');  // Used to make HTTP requests to Hugging Face's inference API
const { saveMessage } = require('./messageController'); // Function to save messages to the database
const { query } = require('express');

async function generateResponse(req, res) {
  const { user_id, messageBySender, chat_session_id } = req.body;
  console.log(user_id, messageBySender, chat_session_id) // Assuming input comes in the request body

  try {
    // Step 1: Generate Bot's Response
    // Request the response from the model (replace with actual model API logic)
    const botResponse = await getBotResponse(messageBySender);

    // Step 2: Save the user message and bot response // Call saveMessage to store the conversation in the database

    // Step 3: Send the bot's response back to the user
    return res.json({
      botResponse,
      message: "Message saved successfully and response generated",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error generating response or saving message" });
  }
}

// Function to get response from the bot (via API or any other method)
async function getBotResponse(userMessage) {
  try {
    // Make a request to Hugging Face's API to get the bot's response
    const response = await axios.post(
      'https://armaanahuja7777.pythonanywhere.com/generate',  // Replace with your model's URL
      {
        query: userMessage,
      },
      {
        headers: {
          "Content-Type": "application/json",
           // Use your Hugging Face API token
        },
      }
    );

    console.log(response); 
    // Get the bot's response from the API response
    const botResponse = response.data['response']; 
    return botResponse;
  } catch (error) {
    console.error("Error with the model API:", error);
    throw new Error("Error generating bot response");
  }
}


module.exports = { generateResponse };