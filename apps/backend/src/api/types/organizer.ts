import { DbLocation } from "./event";

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