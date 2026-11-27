import { prisma } from "../../db/prisma";

import type { Location } from "@shared/types/event";
import type { DbLocation } from "../types/event";

export function toLocation(row: DbLocation): Location {
  return {
    id: row.id,
    venue: row.venue ?? undefined,
    address: row.address,
    city: row.city,
    province: row.province,
    postalCode: row.postalCode,
  };
}

export const locationRepository = {
  async getById(id: number): Promise<Location | null> {
    const location = await prisma.location.findUnique({
      where: { id },
    });

    return location ? toLocation(location) : null;
  },

  // finds first matching location record, or creates a new one, to save memory in the db
  async getOrCreate(input: Omit<Location, "id">): Promise<Location> {
    const locationRecord = await prisma.location.findFirst({
      where: {
        ...input,
        venue: input.venue ?? null,
      },
    });

    if (locationRecord) {
      return toLocation(locationRecord);
    }

    const location = await prisma.location.create({
      data: {
        ...input,
        venue: input.venue ?? null,
      },
    });

    return toLocation(location);
  },
};
