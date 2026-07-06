import express from 'express';
import { syncUser } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/sync', verifyToken, syncUser);

export default router;
