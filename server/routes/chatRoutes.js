import express from 'express';
import {
  sendMessage,
  getSessions,
  getSessionHistory,
  createSession,
  deleteSession
} from '../controllers/chatController.js';
import authMiddleware from '../middleware/auth.js';
import { validateMessage, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// All chat routes require authentication
router.use(authMiddleware);

// POST /api/chat/message
router.post('/message', validateMessage, handleValidationErrors, sendMessage);

// GET /api/chat/sessions
router.get('/sessions', getSessions);

// GET /api/chat/sessions/:sessionId
router.get('/sessions/:sessionId', getSessionHistory);

// POST /api/chat/sessions
router.post('/sessions', createSession);

// DELETE /api/chat/sessions/:sessionId
router.delete('/sessions/:sessionId', deleteSession);

export default router;
