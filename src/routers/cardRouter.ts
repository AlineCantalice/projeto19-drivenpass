import { Router } from "express";
import { createCard, getAllCards, getCardById, removeCard } from "../controllers/cardController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { validateToken } from "../middlewares/validateTokenMiddleware";
import cardSchema from "../schemas/cardSchema";

const router = Router();

router.post('/cards/:userId', validateToken, validateSchemaMiddleware(cardSchema), createCard);
router.get('/cards/:userId', validateToken, getAllCards);
router.get('/cards/:id/:userId', validateToken, getCardById);
router.delete('/cards/:id/:userId', validateToken, removeCard);

export default router;