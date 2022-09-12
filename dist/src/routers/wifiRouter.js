"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wifiController_1 = require("../controllers/wifiController");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const validateTokenMiddleware_1 = require("../middlewares/validateTokenMiddleware");
const wifiSchema_1 = __importDefault(require("../schemas/wifiSchema"));
const router = (0, express_1.Router)();
router.post('/wifi/:userId', validateTokenMiddleware_1.validateToken, (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(wifiSchema_1.default), wifiController_1.createWifi);
router.get('/wifi/:userId', validateTokenMiddleware_1.validateToken, wifiController_1.getAllWifi);
router.get('/wifi/:id/:userId', validateTokenMiddleware_1.validateToken, wifiController_1.getWifiById);
router.delete('/wifi/:id/:userId', validateTokenMiddleware_1.validateToken, wifiController_1.removeWifi);
exports.default = router;
