import { Request, Response } from "express";
import { CreateWifiData } from "../types/wifiTypes";
import * as service from "../services/wifiService";

export async function createWifi(req: Request, res: Response) {
    try {
        const userId: number = Number(req.params.userId);
        const wifi: CreateWifiData = req.body;

        await service.createWifi({ ...wifi, userId });

        res.status(201).send("Wifi created with success!")
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function getAllWifi(req: Request, res: Response) {
    try {
        const userId: number = Number(req.params.userId);

        const wifi = await service.getAllWifi(userId);

        res.status(200).send(wifi)
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function getWifiById(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id);
        const userId: number = Number(req.params.userId);

        const wifi = await service.getWifiById(id, userId);

        res.status(200).send(wifi)
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}

export async function removeWifi(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id);
        const userId: number = Number(req.params.userId);

        await service.removeWifi(id, userId);

        res.status(200).send("Wifi removed with success!!")
    } catch (error: any) {
        res.status(error.response.status).send(error.response.message);
    }
}