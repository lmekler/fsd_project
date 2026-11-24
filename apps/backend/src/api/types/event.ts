import type { DbOrganizer } from "./organizer";

export type DbEvent = {
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

export type DbLocation = {
  id: number;
  venue: string | null;
  address: string;
  city: string;
  province: string;
  postalCode: string;
};

export type DbSavedEvent = {
  savedEventId: number;
  eventId: number;
  userId: number;
};

// For queries that don't include `users`
export type DbEventWithoutUsers = Omit<DbEvent, "users">;

export type DbSavedEventWithDetails = DbSavedEvent & {
  event: DbEventWithoutUsers;
};