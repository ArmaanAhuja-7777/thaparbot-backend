const express = require("express");
const {generateResponse} = require('../controllers/chatBotController');

const router = express.Router();

router.post('/getresponse', generateResponse);
module.exports = router;
