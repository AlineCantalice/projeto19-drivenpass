import { Router } from "express";
import * as userController from '../controllers/userControllers';
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import userSchema from "../schemas/userSchema";

const router = Router();

router.post('/signup', validateSchemaMiddleware(userSchema), userController.signUp);
router.post('/signin', validateSchemaMiddleware(userSchema), userController.singIn);

export default router;