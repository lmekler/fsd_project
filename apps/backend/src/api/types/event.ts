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

// Includes the database relations for organizer and location
export type DbEventWithRelations = DbEvent & {
  organizer: DbOrganizer;
  location: DbLocation;
}

// Attaching complete DbEvent Entry in Saved Event DB entry
export type DbSavedEventWithDetails = DbSavedEvent & {
  event: DbEventWithRelations;
};