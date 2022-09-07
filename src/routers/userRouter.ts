import { Router } from "express";
import * as userController from '../controllers/userControllers';

const router = Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.singIn);

export default router;