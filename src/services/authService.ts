import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";

export async function generateToken(user: Users) {
    return jwt.sign({userId: user.id}, String(process.env.SECRET));
}