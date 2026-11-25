import { prisma } from "../../db/prisma";

import type { Event, NewEventInput } from "@shared/types/event";
import type { DbEvent } from "../types/event"

import { locationRepository } from "./locationRepository";
import { organizerRepository } from "./organizerRepository";

async function toEvent(row: DbEvent): Promise<Event> {
  const organizer = await organizerRepository.getById(row.organizerId);
  const location = await locationRepository.getById(row.locationId);

  if (!organizer) {
    throw new Error("Event organizer not found");
  }
  if (!location) {
    throw new Error("Event location not found");
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
    capacity: row.capacity || undefined,
    registeredCount: row.registeredCount,
    price: row.price,
    isFeatured: row.isFeatured,
    tags: row.tags,
  };
}

export const eventRepository = {
  async getAll(): Promise<Event[]> {
    const dbEvents = await prisma.event.findMany({
      orderBy: { id: "asc" },
    });

    const events: Event[] = [];

    for (const record of dbEvents) {
      const event = await toEvent(record);
      events.push(event);
    }

    return events;
  },

  async getById(id: number): Promise<Event | null> {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    return event ? toEvent(event) : null;
  },

  async add(input: NewEventInput): Promise<Event> {
    const location = await locationRepository.getOrCreate(input.location)

    const event = await prisma.event.create({
      data: {
        organizerId: 1, // temporary organizer id given to all events until we add users
        title: input.title,
        description: input.description ?? null,
        category: input.category ?? null,
        date: input.date,
        startTime: input.startTime,
        endTime: input.endTime ?? null,
        locationId: location.id,
        image: input.image ?? null,
        capacity: input.capacity ?? null,
        tags: input.tags ?? [],
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
