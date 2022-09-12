"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleErrorMiddleware(error, req, res, next) {
    if (error) {
        return res.status(error.response.status).send(error.response.message);
    }
    res.sendStatus(500);
}
exports.default = handleErrorMiddleware;
