import { Location } from "./Event";

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

export interface CreateOrganizer {
  name: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  location: {
    city: string;
    province: string;
  };
}
