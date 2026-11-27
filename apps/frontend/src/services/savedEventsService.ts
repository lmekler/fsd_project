import type { SavedEventWithDetails } from "@shared/types/event";
import { savedEventsRepo } from "../repositories/savedEventsRepo";
import { ApiError } from "../repositories/apiHandler";

export const savedEventsService = {
    async getByUser(userId: number): Promise<SavedEventWithDetails[]> {
        return savedEventsRepo.getByUser(userId);
    },

    async add(
        userId: number,
        eventId: number
    ): Promise<SavedEventWithDetails> {
        try {
            return await savedEventsRepo.add(userId, eventId);
        } catch (err) {
            // For duplicate requests
            if (err instanceof ApiError && err.status === 409) {
                const saved = await savedEventsRepo.getByUser(userId);
                const existing = saved.find(
                    (savedEvent) => savedEvent.eventId === eventId
                )

                if (existing) return existing;
            }

            throw err;
        } 
    },

    async remove(
        userId: number,
        savedEventId: number
    ): Promise<void> {
        try {
            await savedEventsRepo.remove(userId, savedEventId);
        } catch (err) {
            // For missing or unowned events
            if (err instanceof ApiError && err.status === 404) return;
            throw err;
        }
    },

    filterSavedEvents(
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
}
