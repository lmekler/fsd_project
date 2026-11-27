import { prisma } from "../../db/prisma";

import type { Organizer } from "@shared/types/organizer";
import type { DbOrganizer } from "../types/organizer";

import { locationRepository } from "./locationRepository"

export async function toOrganizer(row: DbOrganizer): Promise<Organizer> {
  const location = await locationRepository.getById(row.locationId);

  if (!location) {
    throw new Error("Organizer location not found");
  }

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    email: row.email ?? undefined,
    phone: row.phone,
    website: row.website,
    image: row.image,
    locationId: row.locationId,
    location: location,
  };
}

export const organizerRepository = {
  async getById(id: number): Promise<Organizer | null> {
    const organizer = await prisma.organizer.findUnique({
      where: { id },
      include: {
        location: true,
      },
    });

    return organizer ? toOrganizer(organizer) : null;
  },
}