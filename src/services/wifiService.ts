import { CreateWifiData } from "../types/wifiTypes";
import * as repository from "../repositories/wifiRepository";
import Cryptr from "cryptr";
import { Wifi } from "@prisma/client";

export async function createWifi(wifi: CreateWifiData): Promise<void> {
    
    const hashPassword = encrypt(wifi.password);

    await repository.insert({ ...wifi, password: hashPassword });
}

export async function getAllWifi(userId: number): Promise<CreateWifiData[]> {
    const wifi: CreateWifiData[] = await repository.findAllWifiOfUser(userId);

    const decryptedWifi: CreateWifiData[] = wifi.map(item => {
        const decryptPassword = decrypt(item.password);
        return { ...item, password: decryptPassword }
    });

    return decryptedWifi;
}

export async function getWifiById(id: number, userId: number): Promise<Wifi> {
    const wifi = await repository.findById(id);

    if (!wifi) {
        throw {
            response: {
                status: 404,
                message: "Wifi not found!"
            }
        }
    }

    if (wifi.userId !== userId) {
        throw {
            response: {
                status: 401,
                message: "This Wifi is not yours!"
            }
        }
    }

    const decryptedPassword = decrypt(wifi.password);

    return { ...wifi, password: decryptedPassword };
}

export async function removeWifi(id: number, userId: number): Promise<void> {
    const wifi = await repository.findById(id);

    if (!wifi) {
        throw {
            response: {
                status: 404,
                message: "Wifi not found!"
            }
        }
    }

    if (wifi.userId !== userId) {
        throw {
            response: {
                status: 401,
                message: "This Wifi is not yours!"
            }
        }
    }

    await repository.remove(id);
}

function encrypt(password: string) {
    const cryptr = new Cryptr('myTotallySecretKey');
    return cryptr.encrypt(password);
}

function decrypt(encryptedPassword: string) {
    const cryptr = new Cryptr('myTotallySecretKey');
    return cryptr.decrypt(encryptedPassword);
}