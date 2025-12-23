import express from 'express';
import { checkUser, GetUsers, LoginUser, logOutUser, RegisterUser, updateUser } from '../controllers/authController.js';
import { protectRoutes } from '../middleware/protectRoutes.js';

const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.post('/logout', logOutUser);

router.put('/updateUser/:id', protectRoutes, updateUser);

router.get('/checkUser', protectRoutes, checkUser); //pwede i double check yung id kung tama
router.get('/getUsers', GetUsers);
export default router;