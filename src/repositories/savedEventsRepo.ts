import type { SavedEvent } from "../types/Event";
import data from "../data/data.json";

let savedEvents: SavedEvent[] = [...data.savedEvents];


export function getAllSavedEvents(): SavedEvent[] {
    return [...savedEvents];
}

export function getSavedEventsByUser(userId: string): SavedEvent[] {
    let userSavedEvents: SavedEvent[] = savedEvents.filter(
        (event) => event.userId === userId
    );

    return [...userSavedEvents];
}

export function addSavedEvent(savedEvent: SavedEvent): SavedEvent {
    savedEvents = [...savedEvents, savedEvent];

    return savedEvent;
}

export function removeSavedEvent(savedEventId: string): void {
    const index: number = savedEvents.findIndex(
        (savedEvent) => savedEvent.savedEventId === savedEventId
    );

    if (index !== -1) {
        savedEvents.splice(index, 1);
    }
}
