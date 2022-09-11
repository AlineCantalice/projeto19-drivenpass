import { Router } from "express";
import { createWifi, getAllWifi, getWifiById, removeWifi } from "../controllers/wifiController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { validateToken } from "../middlewares/validateTokenMiddleware";
import wifiSchema from "../schemas/wifiSchema";

const router = Router();

router.post('/wifi/:userId', validateToken, validateSchemaMiddleware(wifiSchema), createWifi);
router.get('/wifi/:userId', validateToken, getAllWifi);
router.get('/wifi/:id/:userId', validateToken, getWifiById);
router.delete('/wifi/:id/:userId', validateToken, removeWifi);

export default router;