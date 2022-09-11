import { CreateCredentialData } from "../types/credentialTypes";
import * as repository from "../repositories/credentialRepository";
import Cryptr from "cryptr";

export async function createCredential(credential: CreateCredentialData) {
    const existCredential = await repository.findByTitleAndUserId(credential.title, credential.userId);

    if (existCredential) {
        throw {
            response: {
                status: 409,
                message: "Title already in use!"
            }
        }
    }

    const hashPassword = encrypt(credential.password);

    await repository.insert({ ...credential, password: hashPassword })
}

export async function getAllCredentials(userId: number) {
    const credentials = await repository.findAllCredentialOfUser(userId);

    const decryptedCredential = credentials.map(item => {
        const decryptPassword = decrypt(item.password);
        return {...item, password: decryptPassword}
    });

    return decryptedCredential;
}

export async function getCredentialById(id: number) {
    console.log("entrou no serviço pra buscar credencial por id")
}

export async function removeCredential(id: number) {
    console.log("entrou no serviço pra remover credencial")
}

function encrypt(password: string) {
    const cryptr = new Cryptr('myTotallySecretKey');
    return cryptr.encrypt(password);
}

function decrypt(encryptedPassword: string) {
    const cryptr = new Cryptr('myTotallySecretKey');
    return cryptr.decrypt(encryptedPassword);
}