import type { CreateOrganizer, Organizer } from "@shared/types/organizer";
import { prisma } from "../../db/prisma";
import type { DbOrganizer } from "../types/dbOrganizer";
import { locationRepository } from "./locationRepository";

async function toOrganizer(organizer: DbOrganizer): Promise<Organizer> {
  const location = await locationRepository.getById(organizer.locationId);

  if (!location) {
    throw new Error("Location not found");
  }

  return {
    ...organizer,
    id: organizer.id,
    email: organizer.email ?? undefined,
    location: location,
  };
}

export const organizerRepository = {
  async getAll(): Promise<Organizer[]> {
    const dbOrganizers = await prisma.organizer.findMany({
      orderBy: { id: "asc" },
      include: {
        location: true,
      },
    });

    const organizers: Organizer[] = [];

    for (const record of dbOrganizers) {
      const organizer = await toOrganizer(record);
      organizers.push(organizer);
    }

    return organizers;
  },

  async getById(id: number): Promise<Organizer | null> {
    const organizer = await prisma.organizer.findUnique({
      where: { id },
      include: {
        location: true,
      },
    });

    return organizer ? toOrganizer(organizer) : null;
  },

  async add(input: CreateOrganizer): Promise<Organizer> {
    const location = await locationRepository.getOrCreate(input.location);

    const organizer = await prisma.organizer.create({
      data: {
        name: input.name,
        description: input.description,
        website: input.website,
        phone: input.phone,
        email: input.email ?? null,
        image: input.image,
        locationId: location.id,
      },
      include: {
        location: true,
      },
    });

    return toOrganizer(organizer);
  },

  async remove(id: number): Promise<boolean> {
    const organizer = await prisma.organizer.findUnique({
      where: { id },
      include: {
        events: true,
      },
    });

    if (!organizer) {
      return false;
    }

    if (organizer.events.length > 0) {
      throw new Error(
        "Cannot delete organizer because they have associated events.",
      );
    }

    await prisma.organizer.delete({
      where: { id },
    });

    return true;
  },
};
