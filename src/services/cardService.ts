import { CreateCardData } from "../types/cardTypes";
import * as repository from "../repositories/cardRepository";
import { Cards } from "@prisma/client";
import { decrypt, encrypt } from "./cryptService";

export async function createCard(card: CreateCardData): Promise<void> {
    const existCard = await repository.findByTitleAndUserId(card.title, card.userId);

    if (existCard) {
        throw {
            response: {
                status: 409,
                message: "Title already in use!"
            }
        }
    }

    const hashPassword = encrypt(card.password);
    const hashCvc = encrypt(card.securityCode);

    await repository.insert({ ...card, password: hashPassword, securityCode: hashCvc });
}

export async function getAllCards(userId: number): Promise<CreateCardData[]> {
    const cards: CreateCardData[] = await repository.findAllCardOfUser(userId);

    const decryptedCard: CreateCardData[] = cards.map(item => {
        const decryptPassword = decrypt(item.password);
        const decryptCvc = decrypt(item.securityCode);
        return { ...item, password: decryptPassword, securityCode: decryptCvc }
    });

    return decryptedCard;
}

export async function getCardById(id: number, userId: number): Promise<Cards> {
    const card = await repository.findById(id);

    if (!card) {
        throw {
            response: {
                status: 404,
                message: "Card not found!"
            }
        }
    }

    if (card.userId !== userId) {
        throw {
            response: {
                status: 401,
                message: "This Card is not yours!"
            }
        }
    }

    const decryptedPassword = decrypt(card.password);
    const decryptedCvc = decrypt(card.securityCode);

    return { ...card, password: decryptedPassword, securityCode: decryptedCvc };
}

export async function removeCard(id: number, userId: number): Promise<void> {
    const Card = await repository.findById(id);

    if (!Card) {
        throw {
            response: {
                status: 404,
                message: "Card not found!"
            }
        }
    }

    if (Card.userId !== userId) {
        throw {
            response: {
                status: 401,
                message: "This Card is not yours!"
            }
        }
    }

    await repository.remove(id);
}