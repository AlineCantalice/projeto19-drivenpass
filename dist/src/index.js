"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const handleErrorMiddleware_1 = __importDefault(require("./middlewares/handleErrorMiddleware"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const credentialRouter_1 = __importDefault(require("./routers/credentialRouter"));
const safeNoteRouter_1 = __importDefault(require("./routers/safeNoteRouter"));
const cardRouter_1 = __importDefault(require("./routers/cardRouter"));
const wifiRouter_1 = __importDefault(require("./routers/wifiRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)(), express_1.default.json());
app.use(authRouter_1.default);
app.use(credentialRouter_1.default);
app.use(safeNoteRouter_1.default);
app.use(cardRouter_1.default);
app.use(wifiRouter_1.default);
app.use(handleErrorMiddleware_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
