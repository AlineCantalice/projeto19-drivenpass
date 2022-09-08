import { Sessions } from "@prisma/client";

export type CreateSessionData = Omit<Sessions, 'id'>;