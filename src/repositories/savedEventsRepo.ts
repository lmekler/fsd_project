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
