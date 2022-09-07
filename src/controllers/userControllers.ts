import { Request, Response } from "express";
import { CreateUserData } from "../types/userTypes";
import * as userService from '../services/userService';

export async function signUp(req: Request, res: Response) {
    try {
        const user: CreateUserData = req.body;

        await userService.signUp(user);

        res.status(201).send('Usuário criado com sucesso!')
    } catch (error) {
        console.log(`Algo deu errado!!`);
    }
}

export async function singIn(req: Request, res: Response) {
    try {
        const user: CreateUserData = req.body;

        const token: string = await userService.signIn(user);

        res.status(200).send(token);
    } catch (error) {
        console.log(`Algo deu errado!!`);
    }
}