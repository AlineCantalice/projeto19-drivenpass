import prismaClient from "../database/postgres";
import { CreateSessionData } from "../types/sessionTypes";

export async function insert(session: CreateSessionData) {
    await prismaClient.sessions.create({ data: session });
}