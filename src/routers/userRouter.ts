import { Router } from "express";
import * as userController from '../controllers/userControllers';

const router = Router();

router.use('/create-account', userController.createUser);

export default router;