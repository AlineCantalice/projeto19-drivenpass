import { Request, Response } from "express";
import { CreateUserData } from "../types/userTypes";
import * as userService from '../services/userService';

export async function createUser(req: Request, res: Response) {
    try {
        const user: CreateUserData = req.body;

        await userService.createUser(user)
    } catch (error) {
        console.log(`Algo deu errado!!`);
    }
}