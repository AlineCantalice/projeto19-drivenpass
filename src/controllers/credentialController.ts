import { Request, Response } from "express";
import { CreateCredentialData } from "../types/credentialTypes";

export async function createCredential(req: Request, res: Response) {
    try {
        const credential: CreateCredentialData = req.body;

        res.status(201).send("Credential criada com sucesso!")
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function getAllCredentials(req: Request, res: Response) {
    try {
        

        res.status(200).send("Enviar as credenciais")
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function getCredentialById(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id);

        res.status(200).send("Enviar a credencial")
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function removeCredential(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id);

        res.status(200).send("Credencial deletada com sucesso!!")
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}