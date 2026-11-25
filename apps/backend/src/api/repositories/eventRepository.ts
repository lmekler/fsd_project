import { prisma } from "../../db/prisma";

import type { Event, Location, NewEventInput } from "@shared/types/event";
import type { DbOrganizer } from "./organizerRepository";
import { toOrganizer } from "./organizerRepository";
import { SavedEvent } from "../../generated/prisma/client";

export type DbLocation = {
  id: number;
  venue: string | null;
  address: string;
  city: string;
  province: string;
  postalCode: string;
};

type DbSavedEvent = {
  savedEventId: number;
  eventId: number;
  userId: number;
};

type DbEvent = {
  id: number;
  organizerId: number;
  // organizer: DbOrganizer;
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
  // location: DbLocation;
  // savedBy: DbSavedEvent[];
};

export function toLocation(row: DbLocation): Location {
  return {
    id: row.id,
    ...(row.venue !== null ? { venue: row.venue } : {}),
    address: row.address,
    city: row.city,
    province: row.province,
    postalCode: row.postalCode
  };
}

export function toSavedEvent(row: DbSavedEvent): SavedEvent {
  return {
    savedEventId: row.savedEventId,
    eventId: row.eventId,
    userId: row.userId,
  };
}

function toEvent(row: DbEvent): Event {
  return {
    id: row.id,
    organizerId: row.organizerId,
    // organizer: toOrganizer(row.organizer),
    title: row.title,
    description: row.description ?? undefined,
    category: row.category ?? undefined,
    date: row.date,
    startTime: row.startTime,
    endTime: row.endTime ?? undefined,
    locationId: row.locationId,
    // location: toLocation(row.location),
    image: row.image ?? undefined,
    capacity: row.capacity,
    registeredCount: row.registeredCount,
    price: row.price,
    isFeatured: row.isFeatured,
    tags: row.tags,
    // savedBy: row.users.map(toSavedEvent),
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
