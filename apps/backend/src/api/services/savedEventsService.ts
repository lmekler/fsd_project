import type {
  Event,
  Location,
  SavedEventWithDetails,
} from "@shared/types/event";
import type {
  DbEventWithRelations,
  DbLocation,
  DbSavedEventWithDetails,
} from "../types/event";
import { savedEventsRepository } from "../repositories/savedEventsRepository";
import { NotFoundError } from "../errors/errors";

// Mapping functions - converts from DB Types to Shared Types

function toLocation(loc: DbLocation): Location {
  return { ...loc, venue: loc.venue ?? undefined };
}

function toEvent(event: DbEventWithRelations): Event {
  return {
    ...event,
    description: event.description ?? undefined,
    category: event.category ?? undefined,
    endTime: event.endTime ?? undefined,
    image: event.image ?? undefined,
    capacity: event.capacity ?? undefined,
    organizer: {
      ...event.organizer,
      email: event.organizer.email ?? undefined,
      location: toLocation(event.organizer.location),
    },
    location: toLocation(event.location),
  };
}

function toSavedEventWithDetails(
  item: DbSavedEventWithDetails,
): SavedEventWithDetails {
  return { ...item, event: toEvent(item.event) };
}

// Service Functions
export const savedEventsService = {
  async getAllByUser(userId: number): Promise<SavedEventWithDetails[]> {
    const savedEvents: DbSavedEventWithDetails[] =
      await savedEventsRepository.getAllWithDetailsByUser(userId);

    return savedEvents.map(toSavedEventWithDetails);
  },

  async add(userId: number, eventId: number): Promise<SavedEventWithDetails> {
    const createdEvent: DbSavedEventWithDetails =
      await savedEventsRepository.add(userId, eventId);

    return toSavedEventWithDetails(createdEvent);
  },

  async remove(userId: number, savedEventId: number): Promise<void> {
    const removedEvent: boolean = await savedEventsRepository.remove(
      userId,
      savedEventId,
    );

    if (!removedEvent) {
      throw new NotFoundError("Saved event not found.");
    }
  },
};
