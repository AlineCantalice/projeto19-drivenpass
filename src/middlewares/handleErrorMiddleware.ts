import { Request, Response, NextFunction } from "express";

export default function handleErrorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
    
    if (error) {
        return res.status(error.response.status).send(error.response.message);
    }

    res.sendStatus(500);
}