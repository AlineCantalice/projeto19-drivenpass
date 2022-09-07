import { CreateUserData } from "../types/userTypes";
import * as userRepository from '../repositories/userRepository';
import { Users } from "@prisma/client";
import bcrypt from 'bcrypt';
import { generateToken } from "./authService";

export async function signUp(user: CreateUserData) {
    const userDB = await findUserByEmail(user.email);

    if(userDB){
        throw {
            response: {
                status: 409,
                message: "Email already in use!"
            }
        }
    }

    const hashPassword = bcrypt.hashSync(user.password, 10);

    await userRepository.insert({email: user.email, password: hashPassword});
}

export async function signIn(user: CreateUserData) {
    const userDB = await findUserByEmail(user.email);

    if(!userDB || !bcrypt.compareSync(user.password, userDB.password)){
        throw {
            response: {
                status: 401,
                message: "Email or password incorrect!"
            }
        }
    }

    return await generateToken(userDB);
}

export async function findUserByEmail(email: string): Promise<Users> {
    return {id: 1, email: 'jdjfdk', password: "jkfnkdj"}
}