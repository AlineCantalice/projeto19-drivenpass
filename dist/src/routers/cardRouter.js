"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardController_1 = require("../controllers/cardController");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const validateTokenMiddleware_1 = require("../middlewares/validateTokenMiddleware");
const cardSchema_1 = __importDefault(require("../schemas/cardSchema"));
const router = (0, express_1.Router)();
router.post('/cards/:userId', validateTokenMiddleware_1.validateToken, (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(cardSchema_1.default), cardController_1.createCard);
router.get('/cards/:userId', validateTokenMiddleware_1.validateToken, cardController_1.getAllCards);
router.get('/cards/:id/:userId', validateTokenMiddleware_1.validateToken, cardController_1.getCardById);
router.delete('/cards/:id/:userId', validateTokenMiddleware_1.validateToken, cardController_1.removeCard);
exports.default = router;
