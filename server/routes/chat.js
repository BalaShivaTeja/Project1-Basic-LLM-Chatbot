const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { sendMessage } = require('../controllers/chatController');
const { validateChatMessage } = require('../middleware/validation');

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

router.post('/', chatLimiter, validateChatMessage, sendMessage);

module.exports = router;
