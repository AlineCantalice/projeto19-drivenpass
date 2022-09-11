import { SafeNotes } from "@prisma/client";

export type CreateSafeNoteData = Omit<SafeNotes, 'id'>;