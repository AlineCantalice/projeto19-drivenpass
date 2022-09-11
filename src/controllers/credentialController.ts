import { Request, Response } from "express";
import { CreateCredentialData } from "../types/credentialTypes";
import * as service from "../services/credentialService";

export async function createCredential(req: Request, res: Response) {
    try {
        const userId: number = Number(req.params.userId);
        const credential: CreateCredentialData = req.body;

        await service.createCredential({ ...credential, userId });

        res.status(201).send("Credential criada com sucesso!")
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function getAllCredentials(req: Request, res: Response) {
    try {

        const credentials = await service.getAllCredentials();

        res.status(200).send(credentials)
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function getCredentialById(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id);

        const credencial = await service.getCredentialById(id);

        res.status(200).send(credencial)
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function removeCredential(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id);

        await service.removeCredential(id);

        res.status(200).send("Credencial deletada com sucesso!!")
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}