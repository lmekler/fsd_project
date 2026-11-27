import type { Location } from "./Event";

export interface Organizer {
  id: number;
  name: string;
  description: string;
  website: string;
  email?: string;
  phone: string;
  image: string;
  locationId: number;
  location: Location;
}

export type CreateOrganizer = Omit<
  Organizer,
  "id" | "locationId" | "location"
> & {
  location: Omit<Location, "id">;
};
