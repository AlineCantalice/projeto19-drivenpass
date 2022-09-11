import prismaClient from "../database/postgres";
import { CreateCardData } from "../types/cardTypes";

export async function insert(card: CreateCardData) {
    await prismaClient.cards.create({ data: card });
}

export async function findById(id: number) {
    return await prismaClient.cards.findUnique({ where: { id } });
}

export async function findAllCardOfUser(userId: number) {
    return await prismaClient.cards.findMany({ where: { userId } });
}

export async function findByTitleAndUserId(title: string, userId: number) {
    return await prismaClient.cards.findUnique({ where: { title_userId: { title, userId } } });
}

export async function remove(id: number) {
    await prismaClient.cards.delete({ where: { id } });
}