import { CreateSafeNoteData } from "../types/safeNoteTypes";
import * as repository from "../repositories/safeNoteRepository";
import { SafeNotes } from "@prisma/client";

export async function createSafeNote(safeNote: CreateSafeNoteData): Promise<void> {
    const existSafeNote = await repository.findByTitleAndUserId(safeNote.title, safeNote.userId);

    if (existSafeNote) {
        throw {
            response: {
                status: 409,
                message: "Title already in use!"
            }
        }
    }

    await repository.insert(safeNote)
}

export async function getAllSafeNotes(userId: number): Promise<CreateSafeNoteData[]> {
    return await repository.findAllSafeNoteOfUser(userId);
}

export async function getSafeNoteById(id: number, userId: number): Promise<SafeNotes> {
    const safeNote = await repository.findById(id);

    if (!safeNote) {
        throw {
            response: {
                status: 404,
                message: "Note not found!"
            }
        }
    }

    if (safeNote.userId !== userId) {
        throw {
            response: {
                status: 401,
                message: "This note is not yours!"
            }
        }
    }

    return safeNote;
}

export async function removeSafeNote(id: number, userId: number): Promise<void> {
    const safeNote = await repository.findById(id);

    if (!safeNote) {
        throw {
            response: {
                status: 404,
                message: "Note not found!"
            }
        }
    }

    if (safeNote.userId !== userId) {
        throw {
            response: {
                status: 401,
                message: "This note is not yours!"
            }
        }
    }

    await repository.remove(id);
}