import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();

const cryptr = new Cryptr(process.env.CRYPT_SECRET ?? '');

export function encrypt(password: string) {
    return cryptr.encrypt(password);
}

export function decrypt(encryptedPassword: string) {
    return cryptr.decrypt(encryptedPassword);
}