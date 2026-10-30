import type { SavedEvent } from "../types/Event";
import type { SavedEventWithDetails } from "../types/Event";
import * as savedEventsRepo from "../repositories/savedEventsRepo";

// For Events - DELETE WHEN INTEGRATED
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

export function filterSavedEvents(
    savedEvents: SavedEventWithDetails[],
    searchTerm: string,
    categoryFilters: string
): SavedEventWithDetails[] {

    const filteredEvents: SavedEventWithDetails[] = savedEvents.filter((event) => {

        // Check if there is any filtering submitted from forms
        const searchMatches: boolean = 
            searchTerm === "" ||
            event.event.title.toLowerCase().includes(searchTerm.toLowerCase());
        
        const categoryMatches: boolean = categoryFilters === "" || event.event.category === categoryFilters;
        
        return searchMatches && categoryMatches;
    })

    return filteredEvents;
}

export function addSavedEvent(userId: string, eventId: string): SavedEventWithDetails[] {
    const alreadySaved = savedEventsRepo.getSavedEventsByUser(userId).some(
        (savedEvent) => savedEvent.eventId === eventId
    );

    if (!alreadySaved && getEventById(eventId)){
        const savedEventId: string = `saved_${crypto.randomUUID()}`;
    
        const savedEvent: SavedEvent = {
            savedEventId,
            userId,
            eventId
        }

        savedEventsRepo.addSavedEvent(savedEvent);
    }

    const rerenderedArray: SavedEventWithDetails[] = getSavedEventsByUser(userId);

    return rerenderedArray;
}

export function removeSavedEvent(userId: string, savedEventId: string): SavedEventWithDetails[] {
    const checkedSavedEvent: SavedEvent | undefined =
        savedEventsRepo.getSavedEventById(savedEventId);
    
    if (checkedSavedEvent && checkedSavedEvent.userId === userId) {
        savedEventsRepo.removeSavedEvent(savedEventId);
    }

    const rerenderedArray: SavedEventWithDetails[] = getSavedEventsByUser(userId);

    return rerenderedArray;
}