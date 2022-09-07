import prismaClient from "../database/postgres";
import { CreateUserData } from "../types/userTypes";

export async function insert(user: CreateUserData) {
    return await prismaClient.users.create({data: user});
}