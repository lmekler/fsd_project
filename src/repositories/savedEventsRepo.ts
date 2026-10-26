import type { SavedEvent } from "../types/Event";
import data from "../data/data.json";

const savedEvents: SavedEvent[] = [...data.savedEvents];


export function getAllSavedEvents(): SavedEvent[] {
    return [...savedEvents];
}

export function getSavedEventsByUser(userId: string): SavedEvent[] {
    let userSavedEvents: SavedEvent[] = savedEvents.filter(
        (event) => event.userId === userId
    );

    return [...userSavedEvents];
}

export function getSavedEventById(savedEventId: string): SavedEvent | undefined {
    const fetchedSavedEvent: SavedEvent | undefined = savedEvents.find(
        (event) => event.savedEventId === savedEventId
    )

    return fetchedSavedEvent;
}

export function addSavedEvent(savedEvent: SavedEvent): SavedEvent {
    savedEvents.push(savedEvent);

    return savedEvent;
}

export function removeSavedEvent(savedEventId: string): void {
    const index: number = savedEvents.findIndex(
        (event) => event.savedEventId === savedEventId
    );

    if (index !== -1) {
        savedEvents.splice(index, 1);
    }
}
