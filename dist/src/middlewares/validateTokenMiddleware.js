"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
dotenv_1.default.config();
function validateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).send('Voce não enviou o token');
        }
        if (authorization.toLowerCase().startsWith('bearer')) {
            authorization = authorization.slice('bearer'.length).trim();
        }
        try {
            jsonwebtoken_1.default.verify(authorization, config_1.default.secret);
            next();
        }
        catch (error) {
            return res.status(401).send('Seu token não é válido');
        }
    });
}
exports.validateToken = validateToken;
