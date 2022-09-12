"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const cardSchema = joi_1.default.object({
    cardName: joi_1.default.string().required(),
    cardNumber: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    securityCode: joi_1.default.string().max(3).required(),
    expirationDate: joi_1.default.string().required(),
    isVirtual: joi_1.default.boolean().required(),
    type: joi_1.default.valid('CREDIT', 'DEBIT', 'BOTH').required(),
    title: joi_1.default.string().required()
});
exports.default = cardSchema;
