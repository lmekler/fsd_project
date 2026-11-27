import { useCallback, useEffect, useState } from "react";
import type { SavedEventWithDetails } from "@shared/types/event";
import { savedEventsService } from "../services/savedEventsService";

export function useSavedEvents(userId: number | undefined) {
    // Set States
    const [savedEvents, setSavedEvents] = useState<SavedEventWithDetails[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [categoryFilters, setCategoryFilters] = useState<string>("")

    useEffect(() => {
        if (userId === undefined) {
            setSavedEvents([]);
            return;
        }

        savedEventsService
            .getByUser(userId)
            .then(setSavedEvents)
            .catch(console.error);
    
    }, [userId]);

    const filteredSavedEvents = savedEventsService.filterSavedEvents(
        savedEvents,
        searchTerm,
        categoryFilters
    );

    const addSavedEvent = useCallback(
        async (eventId: number): Promise<void> => {
            if (userId === undefined) return;

            try {
                const saved: SavedEventWithDetails = 
                    await savedEventsService.add(userId, eventId);
                
                // Only adds new event if it's not already there
                setSavedEvents((prev) => {
                    const alreadyInList = prev.some(
                        (item) => item.savedEventId === saved.savedEventId
                    );

                    if (alreadyInList) {
                        return prev;
                    }

                    return [...prev, saved]
                });
            } catch (err) {
                console.error(err);
            }
        }, [userId]
    );

    const isSaved = useCallback(
        (eventId: number) => savedEvents.some((event) => event.eventId === eventId),
        [savedEvents]
    )

    const removeSavedEvent = useCallback(
        async (savedEventId: number): Promise<void> => {
            if (userId === undefined) return;

            try {
                await savedEventsService.remove(userId, savedEventId);
                setSavedEvents((prev) =>
                    prev.filter((item) => item.savedEventId !== savedEventId)
                );
            } catch (err) {
                console.error(err);
            }
        }, [userId]
    );

    return {
        savedEvents,
        filteredSavedEvents,
        setSearchTerm,
        setCategoryFilters,
        addSavedEvent,
        isSaved,
        removeSavedEvent
    }
}