import { prisma } from "../../db/prisma";

import type { Event, Location, NewEventInput } from "@shared/types/event";

import { locationRepository } from "./locationRepository";
import { organizerRepository } from "./organizerRepository";

type DbEvent = {
  id: number;
  organizerId: number;
  title: string;
  description: string | null;
  category: string | null;
  date: string;
  startTime: string;
  endTime: string | null;
  image: string | null;
  capacity: number;
  registeredCount: number;
  price: number;
  isFeatured: boolean;
  tags: string[];
  locationId: number;
};

async function toEvent(row: DbEvent): Promise<Event> {
  const location = await locationRepository.getById(row.locationId);

  if (!location) {
    throw new Error("Event location not found");
  }

  const organizer = await organizerRepository.getById(row.organizerId);

  if (!organizer) {
    throw new Error("Event organizer not found");
  }

  return {
    id: row.id,
    organizerId: row.organizerId,
    organizer: organizer,
    title: row.title,
    description: row.description ?? undefined,
    category: row.category ?? undefined,
    date: row.date,
    startTime: row.startTime,
    endTime: row.endTime ?? undefined,
    locationId: row.locationId,
    location: location,
    image: row.image ?? undefined,
    capacity: row.capacity,
    registeredCount: row.registeredCount,
    price: row.price,
    isFeatured: row.isFeatured,
    tags: row.tags,
  };
}

export const eventRepository = {
  async getAll(): Promise<Event[]> {
    const events = await prisma.event.findMany({
      orderBy: { id: "asc" },
      include: {
        location: true,
        organizer: {
          include: {
            location: true,
          },
        },
        users: true,
      },
    });

    return events.map(toEvent);
  },

  async getById(id: number): Promise<Event | null> {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        location: true,
        organizer: {
          include: {
            location: true,
          },
        },
        users: true,
      },
    });

    return event ? toEvent(event) : null;
  },

 async add(input: Omit<Event, "id">): Promise<Event> {
    const event = await prisma.event.create({
      data: {
        organizerId: input.organizerId,
        title: input.title,
        description: input.description ?? null,
        category: input.category ?? null,
        date: input.date,
        startTime: input.startTime,
        endTime: input.endTime ?? null,
        locationId: input.locationId,
        image: input.image ?? null,
        capacity: input.capacity,
        registeredCount: input.registeredCount,
        price: input.price,
        isFeatured: input.isFeatured,
        tags: input.tags ?? [],
      },
      include: {
        location: true,
        organizer: {
          include: {
            location: true,
          },
        },
        users: true,
      },
    });

    return toEvent(event);
  },

  async remove(id: number): Promise<boolean> {
    const result = await prisma.$transaction(async (tx) => {
      await tx.savedEvent.deleteMany({
        where: { eventId: id },
      });

      return tx.event.deleteMany({
        where: { id },
      });
    });

    return result.count > 0;
  },
};
