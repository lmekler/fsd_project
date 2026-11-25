import { prisma } from "../../db/prisma";

import type { Organizer } from "@shared/types/organizer";

import type { Location } from "@shared/types/event";
import type { DbLocation } from "./eventRepository";
import { toLocation } from "./eventRepository";

export type DbOrganizer = {
  id: number;
  name: string;
  description: string;
  email: string | null;
  phone: string;
  website: string;
  image: string;
  locationId: number;
};

export function toOrganizer(row: DbOrganizer): Organizer {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    email: row.email ?? undefined,
    phone: row.phone,
    website: row.website,
    image: row.image,
    locationId: row.locationId,
    // location: toLocation(row.location),
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