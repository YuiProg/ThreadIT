import express from "express";
import { getThreads, newThread } from "../controllers/threadController.js";
import { protectRoutes } from "../middleware/protectRoutes.js";

const router = express.Router();

router.post('/newThread', protectRoutes, newThread);
router.get('/getThreads', getThreads);

export default router;