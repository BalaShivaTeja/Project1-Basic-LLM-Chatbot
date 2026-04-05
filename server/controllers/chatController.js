const { validationResult } = require('express-validator');
const { getChatResponse } = require('../services/llmService');
const Chat = require('../models/Chat');

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const sendMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { message, sessionId } = req.body;

  if (!UUID_RE.test(sessionId)) {
    return res.status(400).json({ error: 'Invalid sessionId format.' });
  }

  try {
    const reply = await getChatResponse(message);

    let chat = await Chat.findOne({ sessionId });
    if (!chat) {
      chat = new Chat({ sessionId, messages: [] });
    }
    chat.messages.push({ role: 'user', content: message });
    chat.messages.push({ role: 'assistant', content: reply });
    await chat.save();

    return res.json({ reply });
  } catch (error) {
    console.error('Chat controller error:', error.message);
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

module.exports = { sendMessage };
