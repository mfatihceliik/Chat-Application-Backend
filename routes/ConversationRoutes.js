const express = require('express');
const router = express.Router()
const ConversationController = require("../controller/ConversationController.js")

router.post('/createConversation/:userId', ConversationController.createConversation)

module.exports = router