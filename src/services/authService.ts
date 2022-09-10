import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";
import { PayloadUserData } from "../types/userTypes";

export async function generateToken(user: Users) {

    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';
    const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

    const payload: PayloadUserData = {
        id: user.id,
        email: user.email,
    }

    const jwtConfig = {
        expiresIn: EXPIRES_IN
    };

    const token = jwt.sign(payload, SECRET, jwtConfig);

    return token;
}