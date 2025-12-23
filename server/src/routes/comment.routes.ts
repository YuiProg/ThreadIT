import express from 'express'
import { protectRoutes } from '../middleware/protectRoutes.js';
import { getComments, newComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/newComment', protectRoutes, newComment);

router.get('/getComments/:id', getComments);

export default router;