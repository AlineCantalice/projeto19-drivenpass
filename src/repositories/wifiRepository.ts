import prismaClient from "../database/postgres";
import { CreateWifiData } from "../types/wifiTypes";

export async function insert(wifi: CreateWifiData) {
    await prismaClient.wifi.create({ data: wifi });
}

export async function findById(id: number) {
    return await prismaClient.wifi.findUnique({ where: { id } });
}

export async function findAllWifiOfUser(userId: number) {
    return await prismaClient.wifi.findMany({ where: { userId } });
}

export async function remove(id: number) {
    await prismaClient.wifi.delete({ where: { id } });
}