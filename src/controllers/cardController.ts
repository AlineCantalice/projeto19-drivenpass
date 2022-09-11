import { Request, Response } from "express";
import { CreateCardData } from "../types/cardTypes";
import * as service from "../services/cardService";

export async function createCard(req: Request, res: Response) {
    try {
        const userId: number = Number(req.params.userId);
        const card: CreateCardData = req.body;

        await service.createCard({ ...card, userId });

        res.status(201).send("Cartão criado com sucesso!")
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function getAllCards(req: Request, res: Response) {
    try {
        const userId: number = Number(req.params.userId);

        const cards = await service.getAllCards(userId);

        res.status(200).send(cards)
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function getCardById(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id);
        const userId: number = Number(req.params.userId);

        const card = await service.getCardById(id, userId);

        res.status(200).send(card)
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function removeCard(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id);
        const userId: number = Number(req.params.userId);

        await service.removeCard(id, userId);

        res.status(200).send("card deletada com sucesso!!")
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}