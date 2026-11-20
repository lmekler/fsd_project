import { Organizer } from "./Organizer";

export interface Event {
  id: number;
  organizerId: number;
  organizer: Organizer;
  title: string;
  description?: string;
  category?: string;
  date: string;
  startTime: string;
  endTime?: string;
  locationId: number;
  location: Location;
  image?: string;
  capacity: number;
  registeredCount: number;
  price: number;
  isFeatured: boolean;
  tags?: string[];
  users: SavedEvent[];
}

export interface Location {
  id: number;
  venue?: string;
  address?: string;
  city: string;
  province: string;
  postalCode?: string;
}

export interface SavedEvent {
  savedEventId: number;
  userId: number;
  eventId: number;
}

export interface SavedEventWithDetails extends SavedEvent {
  event: Event;
}
