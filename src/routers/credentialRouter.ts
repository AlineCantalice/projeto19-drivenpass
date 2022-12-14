import { Router } from "express";
import { createCredential, getAllCredentials, getCredentialById, removeCredential } from "../controllers/credentialController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { validateToken } from "../middlewares/validateTokenMiddleware";
import credentialSchema from "../schemas/credentialSchema";

const router = Router();

router.post('/credentials/:userId', validateToken, validateSchemaMiddleware(credentialSchema), createCredential);
router.get('/credentials/:userId', validateToken, getAllCredentials);
router.get('/credentials/:id/:userId', validateToken, getCredentialById);
router.delete('/credentials/:id/:userId', validateToken, removeCredential);

export default router;