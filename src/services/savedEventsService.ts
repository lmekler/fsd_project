import type { SavedEvent } from "../types/Event";
import type { SavedEventWithDetails } from "../types/Event";
import * as savedEventsRepo from "../repositories/savedEventsRepo";

// For Events
import type { Event } from "../types/Event";
import data from "../data/data.json";

// Function Mocks - DELETE WHEN INTEGRATED
let events: Event[] = [...data.events];

function getEventById(eventId: string): Event | undefined {
    const returnedEvent: Event | undefined = events.find(
        (event) => event.id === eventId
    );

    return returnedEvent
}

// Actual Service functions

export function getSavedEventsByUser(userId: string): SavedEventWithDetails[] {
    const savedUserEvents: SavedEvent[] =
        savedEventsRepo.getSavedEventsByUser(userId);

    const savedEventsWithDetails: SavedEventWithDetails[] = savedUserEvents.flatMap((item) => {
        const event = getEventById(item.eventId);

        if(!event) {
            return [];
        }

        return [{
            ...item,
            event
        }]
    });
    
    return savedEventsWithDetails;
}