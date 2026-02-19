import express from "express";
import { newThread } from "../controllers/threadController.js";
import { protectRoutes } from "../middleware/protectRoutes.js";

const router = express.Router();

router.post('/newThread', protectRoutes, newThread);

export default router;