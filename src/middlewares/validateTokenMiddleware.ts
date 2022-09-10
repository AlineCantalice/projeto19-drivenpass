import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

export function validateToken() {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization'];

        if(!token){
            return res.status(401).send("Token não enviado!");
        }

        const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';

        try {
            jwt.verify(token, SECRET);
            next();
        } catch (error) {
            return res.status(401).send("Token inválido!");
        }
    };
}