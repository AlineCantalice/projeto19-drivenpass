import { Request, Response } from "express";
import { CreateSafeNoteData } from "../types/safeNoteTypes";
import * as service from "../services/safeNoteService";

export async function createSafeNote(req: Request, res: Response) {
    try {
        const userId: number = Number(req.params.userId);
        const SafeNote: CreateSafeNoteData = req.body;

        await service.createSafeNote({ ...SafeNote, userId });

        res.status(201).send("SafeNote criada com sucesso!")
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function getAllSafeNotes(req: Request, res: Response) {
    try {
        const userId: number = Number(req.params.userId);

        const SafeNotes = await service.getAllSafeNotes(userId);

        res.status(200).send(SafeNotes)
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function getSafeNoteById(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id);
        const userId: number = Number(req.params.userId);

        const credencial = await service.getSafeNoteById(id, userId);

        res.status(200).send(credencial)
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function removeSafeNote(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id);
        const userId: number = Number(req.params.userId);

        await service.removeSafeNote(id, userId);

        res.status(200).send("Credencial deletada com sucesso!!")
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}