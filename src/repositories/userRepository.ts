import prismaClient from "../database/postgres";
import { CreateUserData } from "../types/userTypes";

export async function insert(user: CreateUserData) {
    await prismaClient.users.create({ data: user });
}

export async function findUserByEmail(email: string) {
    return await prismaClient.users.findUnique({ where: { email } });
}

