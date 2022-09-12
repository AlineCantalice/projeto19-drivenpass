"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credentialController_1 = require("../controllers/credentialController");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const validateTokenMiddleware_1 = require("../middlewares/validateTokenMiddleware");
const credentialSchema_1 = __importDefault(require("../schemas/credentialSchema"));
const router = (0, express_1.Router)();
router.post('/credentials/:userId', validateTokenMiddleware_1.validateToken, (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(credentialSchema_1.default), credentialController_1.createCredential);
router.get('/credentials/:userId', validateTokenMiddleware_1.validateToken, credentialController_1.getAllCredentials);
router.get('/credentials/:id/:userId', validateTokenMiddleware_1.validateToken, credentialController_1.getCredentialById);
router.delete('/credentials/:id/:userId', validateTokenMiddleware_1.validateToken, credentialController_1.removeCredential);
exports.default = router;
