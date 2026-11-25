import type { Organizer } from "./organizer";

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
  capacity?: number;
  registeredCount: number;
  price: number;
  isFeatured: boolean;
  tags?: string[];
  savedBy: SavedEvent[];
}

// What a new event form sends (an event, excluding server owned values)
export type NewEventInput = Omit<
  Event,
  | "id"
  | "organizerId"
  | "organizer"
  | "locationId"
  | "registeredCount"
  | "isFeatured"
  | "savedBy"
>;

export interface Location {
  id: number;
  venue?: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface SavedEvent {
  savedEventId: number;
  userId: number;
  eventId: number;
}

export interface SavedEventWithDetails extends SavedEvent {
  event: Event;
}
