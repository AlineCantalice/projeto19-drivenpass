import { Router } from "express";
import * as userController from '../controllers/authControllers';
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import authSchema from "../schemas/authSchema";

const router = Router();

router.post('/signup', validateSchemaMiddleware(authSchema), userController.signUp);
router.post('/signin', validateSchemaMiddleware(authSchema), userController.singIn);

export default router;