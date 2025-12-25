import express from 'express';
import { createImagePost, createVideoPost, downvotePost, getPosts, getSinglePost, likePost, undownvotePost, unlikePost } from '../controllers/postController.js';
import { protectRoutes } from '../middleware/protectRoutes.js';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
router.post('/createImagePost', protectRoutes, createImagePost);
router.post('/createVideoPost', upload.single('file'), protectRoutes, createVideoPost);
//upvote downvote routes
router.put('/likePost/:postId', protectRoutes, likePost);
router.put('/unlikePost/:postId', protectRoutes, unlikePost);
router.put('/downvotePost/:postId', protectRoutes, downvotePost);
router.put('/undownvotePost/:postId', protectRoutes, undownvotePost);
router.get('/getPosts', protectRoutes, getPosts);
router.get('/getPost/:id', protectRoutes, getSinglePost);
export default router;
//# sourceMappingURL=post.routes.js.map