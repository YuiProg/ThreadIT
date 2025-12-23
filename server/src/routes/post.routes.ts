import express from 'express'
import { createImagePost, createVideoPost, getPosts, getSinglePost } from '../controllers/postController.js';
import { protectRoutes } from '../middleware/protectRoutes.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const router = express.Router();

router.post('/createImagePost', protectRoutes, createImagePost);
router.post('/createVideoPost', upload.single('file'), protectRoutes, createVideoPost);

router.get('/getPosts', protectRoutes, getPosts);
router.get('/getPost/:id', protectRoutes, getSinglePost);

export default router;