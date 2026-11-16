import { prisma } from "../db/prisma";

import type { Event, Location, SavedEvent } from "@shared/types/Event";
import type { Organizer } from "@shared/types/Organizer";

type DbEvent = {
  id: number;
  organizerId: number;
  organizer: Organizer;
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
  isFree: boolean;
  isFeatured: boolean;
  tags: string[];
  locationId: number;
  location: Location;
  users: SavedEvent[];
};

function toEvent(row: DbEvent): Event {
  return {
    id: row.id,
    organizerId: row.organizerId,
    organizer: row.organizer,
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
    location: row.location,
    users: row.users.map((user) => ({
      savedEventId: user.savedEventId,
      userId: user.userId,
      eventId: user.eventId,
    })),
  };
}
