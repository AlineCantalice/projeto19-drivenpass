import prismaClient from "../database/postgres";
import { CreateCredentialData } from "../types/credentialTypes";

export async function insert(credential: CreateCredentialData) {
    await prismaClient.credentials.create({ data: credential });
}

export async function findAllCredentialOfUser(userId: number) {
    return await prismaClient.credentials.findMany({ where: { userId }, select: { title: true, url: true, username: true, password: true } });
}

export async function findByTitleAndUserId(title: string, userId: number) {
    return await prismaClient.credentials.findUnique({ where: { title_userId: { title, userId } } });
}