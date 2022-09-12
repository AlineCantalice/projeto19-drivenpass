"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const safeNoteController_1 = require("../controllers/safeNoteController ");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const validateTokenMiddleware_1 = require("../middlewares/validateTokenMiddleware");
const safeNoteSchema_1 = __importDefault(require("../schemas/safeNoteSchema"));
const router = (0, express_1.Router)();
router.post('/safenotes/:userId', validateTokenMiddleware_1.validateToken, (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(safeNoteSchema_1.default), safeNoteController_1.createSafeNote);
router.get('/safenotes/:userId', validateTokenMiddleware_1.validateToken, safeNoteController_1.getAllSafeNotes);
router.get('/safenotes/:id/:userId', validateTokenMiddleware_1.validateToken, safeNoteController_1.getSafeNoteById);
router.delete('/safenotes/:id/:userId', validateTokenMiddleware_1.validateToken, safeNoteController_1.removeSafeNote);
exports.default = router;
