"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cryptr = new cryptr_1.default((_a = process.env.CRYPT_SECRET) !== null && _a !== void 0 ? _a : '');
function encrypt(password) {
    return cryptr.encrypt(password);
}
exports.encrypt = encrypt;
function decrypt(encryptedPassword) {
    return cryptr.decrypt(encryptedPassword);
}
exports.decrypt = decrypt;
