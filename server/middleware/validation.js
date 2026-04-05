const { body } = require('express-validator');

const validateChatMessage = [
  body('message')
    .notEmpty()
    .withMessage('Message must not be empty.')
    .isLength({ min: 1, max: 4000 })
    .withMessage('Message must be between 1 and 4000 characters.'),
  body('sessionId')
    .notEmpty()
    .withMessage('sessionId is required.'),
];

module.exports = { validateChatMessage };
