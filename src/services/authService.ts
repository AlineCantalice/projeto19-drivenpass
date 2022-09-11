import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";
import { PayloadUserData } from "../types/userTypes";
import { CreateUserData } from "../types/userTypes";
import * as userRepository from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import * as userService from "./userService";

export async function signUp(user: CreateUserData) {
    const userDB = await userService.findUserByEmail(user.email);

    if (userDB) {
        throw {
            response: {
                status: 409,
                message: "Email already in use!"
            }
        }
    }

    const hashPassword = bcrypt.hashSync(user.password, 10);

    await userRepository.insert({ email: user.email, password: hashPassword });
}

export async function signIn(user: CreateUserData) {
    const userDB = await userService.findUserByEmail(user.email);

    if (!userDB) {
        throw {
            response: {
                status: 401,
                message: "You must create a new profile"
            }
        }
    }

    if (!bcrypt.compareSync(user.password, userDB.password)) {
        throw {
            response: {
                status: 401,
                message: "Email or password incorrect!"
            }
        }
    }

    const token = await generateToken(userDB);

    return token;
}

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