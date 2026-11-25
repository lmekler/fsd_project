import type { Organizer } from "@shared/types/Organizer";
import type { DbLocation } from "./eventRepository";
import { toLocation } from "./eventRepository";

export type DbOrganizer = {
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

export function toOrganizer(row: DbOrganizer): Organizer {
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
