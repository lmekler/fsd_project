import { prisma } from "../db/prisma";

import type { Event, Location, SavedEvent } from "@shared/types/Event";
import type { Organizer } from "@shared/types/Organizer";

type DbLocation = {
  id: number;
  venue: string | null;
  address: string;
  city: string;
  province: string;
  postalCode: string | null;
};

type DbOrganizer = {
  id: number;
  name: string;
  description: string;
  email: string | null;
  phone: string;
  website: string;
  image: string;
  locationId: number;
  location: DbLocation;
};

type DbSavedEvent = {
  savedEventId: number;
  eventId: number;
  userId: number;
};

type DbEvent = {
  id: number;
  organizerId: number;
  organizer: DbOrganizer;
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
  location: DbLocation;
  users: DbSavedEvent[];
};

function toLocation(row: DbLocation): Location {
  return {
    id: row.id,
    ...(row.venue !== null ? { venue: row.venue } : {}),
    address: row.address,
    city: row.city,
    province: row.province,
    ...(row.postalCode !== null ? { postalCode: row.postalCode } : {}),
  };
}

function toOrganizer(row: DbOrganizer): Organizer {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    ...(row.email !== null ? { email: row.email } : {}),
    phone: row.phone,
    website: row.website,
    image: row.image,
    locationId: row.locationId,
    location: toLocation(row.location),
  };
}

function toEvent(row: DbEvent): Event {
  return {
    id: row.id,
    organizerId: row.organizerId,
    organizer: toOrganizer(row.organizer),
    title: row.title,
    ...(row.description !== null ? { description: row.description } : {}),
    ...(row.category !== null ? { category: row.category } : {}),
    date: row.date,
    startTime: row.startTime,
    ...(row.endTime !== null ? { endTime: row.endTime } : {}),
    ...(row.image !== null ? { image: row.image } : {}),
    capacity: row.capacity,
    registeredCount: row.registeredCount,
    price: row.price,
    isFeatured: row.isFeatured,
    tags: row.tags,
    locationId: row.locationId,
    location: toLocation(row.location),
    users: row.users.map((user) => ({
      savedEventId: user.savedEventId,
      userId: user.userId,
      eventId: user.eventId,
    })),
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
};
