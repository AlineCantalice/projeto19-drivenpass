import { CreateCredentialData } from "../types/credentialTypes";
import * as repository from "../repositories/credentialRepository";
import { Credentials } from "@prisma/client";
import { decrypt, encrypt } from "./cryptService";

export async function createCredential(credential: CreateCredentialData): Promise<void> {
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

export async function getAllCredentials(userId: number): Promise<CreateCredentialData[]> {
    const credentials: CreateCredentialData[] = await repository.findAllCredentialOfUser(userId);

    const decryptedCredential: CreateCredentialData[] = credentials.map(item => {
        const decryptPassword = decrypt(item.password);
        return { ...item, password: decryptPassword }
    });

    return decryptedCredential;
}

export async function getCredentialById(id: number, userId: number): Promise<Credentials> {
    const credential = await repository.findById(id);

    if (!credential) {
        throw {
            response: {
                status: 404,
                message: "Credential not found!"
            }
        }
    }

    if (credential.userId !== userId) {
        throw {
            response: {
                status: 401,
                message: "This credential is not yours!"
            }
        }
    }

    const decryptedPassword = decrypt(credential.password);

    return { ...credential, password: decryptedPassword };
}

export async function removeCredential(id: number, userId: number): Promise<void> {
    const credential = await repository.findById(id);

    if (!credential) {
        throw {
            response: {
                status: 404,
                message: "Credential not found!"
            }
        }
    }

    if (credential.userId !== userId) {
        throw {
            response: {
                status: 401,
                message: "This credential is not yours!"
            }
        }
    }

    await repository.remove(id);
}