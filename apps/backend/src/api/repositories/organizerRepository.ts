import type { Organizer } from "@shared/types/organizer";
import { prisma } from "../../db/prisma";
import type {
    Location
} from "@shared/types/event";
import type {
    DbLocation
} from "../types/event";
import type {
    DbOrganizer
} from "../types/organizer";

export function toLocation(loc: DbLocation): Location {
    return { ...loc, venue: loc.venue ?? undefined };
}

export function toOrganizer(organizer: DbOrganizer): Organizer {
    return {
        ...organizer,
        name: organizer.name,
        description: organizer.description,
        website: organizer.website,
        phone: organizer.phone,
        email: organizer.email ?? undefined,
        image: organizer.image,
        locationId: organizer.locationId,
        location: toLocation(organizer.location),
    };
}

export const organizerRepository = {
  async getAll(): Promise<Organizer[]> {
    const organizers = await prisma.organizer.findMany({
      orderBy: { id: "asc" },
      include: {
        location: true
      },
    });

    return organizers.map(toOrganizer);
  },

  async add(input: Organizer): Promise<Organizer> {
    const organizer = await prisma.organizer.create({
      data: {
        id: input.id,
        name: input.name,
        description: input.description,
        website: input.website,
        phone: input.phone,
        email: input.email ?? null,
        locationId: input.locationId,
        image: input.image
      },
      include: {
        location: true
      },
    });

    return toOrganizer(organizer);
  },

  async remove(id: number): Promise<boolean> {
    const result = await prisma.$transaction(async (tx) => {
      return tx.organizer.deleteMany({
        where: { id },
      });
    });

    return result.count > 0;
  },
};

