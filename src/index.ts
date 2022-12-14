import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import handleErrorMiddleware from './middlewares/handleErrorMiddleware';
import authRouter from './routers/authRouter';
import credentialRouter from './routers/credentialRouter';
import safeNoteRouter from './routers/safeNoteRouter';
import cardRouter from './routers/cardRouter';
import wifiRouter from './routers/wifiRouter';

dotenv.config();

const app = express();

app.use(cors(), express.json());

app.use(authRouter);
app.use(credentialRouter);
app.use(safeNoteRouter);
app.use(cardRouter);
app.use(wifiRouter);

app.use(handleErrorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});