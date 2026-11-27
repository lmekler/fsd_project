export type DbEvent = {
  id: number;
  organizerId: number;
  title: string;
  description: string | null;
  category: string | null;
  date: string;
  startTime: string;
  endTime: string | null;
  image: string | null;
  capacity: number | null;
  registeredCount: number;
  price: number;
  isFeatured: boolean;
  tags: string[];
  locationId: number;
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