import { Request, Response, NextFunction } from "express";

export default function handleErrorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
    console.log(error);
    if (error) {
        return res.status(error.response.status).send(error.response.message);
    }

    res.sendStatus(500);
}