import type { CreateOrganizer, Organizer } from "@shared/types/organizer";
import { prisma } from "../../db/prisma";
import type {
    DbOrganizer
} from "../types/organizer";
import { locationRepository } from "./locationRepository";

export function toOrganizer(organizer: DbOrganizer): Organizer {
    if (!organizer.location) {
      throw new Error("Location not found");
    }

    return {
        ...organizer,
        email: organizer.email ?? undefined,
        location: {
          ...organizer.location,
          venue: organizer.location.venue ?? undefined
        }
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

  async add(input: CreateOrganizer): Promise<Organizer> {
    const location = await locationRepository.getOrCreate(input.location);

    const organizer = await prisma.organizer.create({
      data: {
        id: Guid.create,
        name: input.name,
        description: input.description,
        website: input.website,
        phone: input.phone,
        email: input.email ?? null,
        image: input.image,
        locationId: location.id
      },
      include: {
        location: true
      },
    });

    return toOrganizer(organizer);
  },

  async remove(id: number): Promise<boolean> {
    const result = await prisma.organizer.deleteMany({
      where: { id },
    });

    return result.count > 0;
  },
};

