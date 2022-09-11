import { Wifi } from "@prisma/client";

export type CreateWifiData = Omit<Wifi, 'id'>;