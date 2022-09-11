import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send('Voce não enviou o token');
    }

    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';

    try {
        jwt.verify(authorization, SECRET);
        next();
    } catch (error) {
        return res.status(401).send('Seu token não é válido');
    }
}