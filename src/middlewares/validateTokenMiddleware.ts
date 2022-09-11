import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import auth from '../config';

dotenv.config();

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    let { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send('Voce não enviou o token');
    }

    if (authorization.toLowerCase().startsWith('bearer')) {
        authorization = authorization.slice('bearer'.length).trim();
      }

    try {
        jwt.verify(authorization, auth.secret);
        next();
    } catch (error) {
        return res.status(401).send('Seu token não é válido');
    }
}