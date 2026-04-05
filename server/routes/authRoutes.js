import express from 'express';
import { register, login, refreshToken } from '../controllers/authController.js';
import { validateRegistration, validateLogin, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', validateRegistration, handleValidationErrors, register);

// POST /api/auth/login
router.post('/login', validateLogin, handleValidationErrors, login);

// POST /api/auth/refresh
router.post('/refresh', refreshToken);

export default router;
