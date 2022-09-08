import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";
import * as sessionRepository from "../repositories/authRepository";
import { CreateSessionData } from "../types/sessionTypes";

export async function generateToken(user: Users) {
    return jwt.sign({userId: user.id}, String(process.env.SECRET));
}

export async function insert(session: CreateSessionData) {
    await sessionRepository.insert(session);
}