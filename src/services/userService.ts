import { CreateUserData } from "../types/userTypes";
import * as userRepository from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import * as authService from "./authService";

export async function signUp(user: CreateUserData) {
    const userDB = await findUserByEmail(user.email);
    
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
    const userDB = await findUserByEmail(user.email);

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

    const token = await authService.generateToken(userDB);

    return token;
}

export async function findUserByEmail(email: string) {
    return await userRepository.findUserByEmail(email);
}