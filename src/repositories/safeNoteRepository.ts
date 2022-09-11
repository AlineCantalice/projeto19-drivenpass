import prismaClient from "../database/postgres";
import { CreateSafeNoteData } from "../types/safeNoteTypes";

export async function insert(safeNote: CreateSafeNoteData) {
    await prismaClient.safeNotes.create({ data: safeNote });
}

export async function findById(id: number) {
    return await prismaClient.safeNotes.findUnique({ where: { id } });
}

export async function findAllSafeNoteOfUser(userId: number) {
    return await prismaClient.safeNotes.findMany({ where: { userId } });
}

export async function findByTitleAndUserId(title: string, userId: number) {
    return await prismaClient.safeNotes.findUnique({ where: { userId_title: { userId, title } } });
}

export async function remove(id: number) {
    await prismaClient.safeNotes.delete({ where: { id } });
}