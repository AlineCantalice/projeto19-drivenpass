"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = {
    secret: String(process.env.TOKEN_SECRET_KEY),
    expires: String(process.env.TOKEN_EXPIRES_IN)
};
exports.default = auth;
