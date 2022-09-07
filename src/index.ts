import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import handleErrorMiddleware from './middlewares/handleErrorMiddleware';
import userRouter from './routers/userRouter';

dotenv.config();

const app = express();

app.use(cors(), express.json());

app.use(userRouter);

app.use(handleErrorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});