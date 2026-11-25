import { prisma } from "../../db/prisma";

import type { Location } from "@shared/types/event";

export type DbLocation = {
  id: number;
  venue: string | null;
  address: string;
  city: string;
  province: string;
  postalCode: string;
};

export function toLocation(row: DbLocation): Location {
  return {
    id: row.id,
    venue: row.venue ?? undefined,
    address: row.address,
    city: row.city,
    province: row.province,
    postalCode: row.postalCode
  };
}

export const locationRepository = {
  async getById(id: number): Promise<Location | null> {
    const location = await prisma.location.findUnique({
      where: { id }
    });

    return location ? toLocation(location) : null;
  },
}