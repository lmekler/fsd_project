import { useCallback, useEffect, useState } from "react";
import * as savedEventsService from "../services/savedEventsService";
import type { SavedEventWithDetails } from "../types/Event";

export function useSavedEvents(userId: string) {
    // Set States
    const [savedEvents, setSavedEvents] = useState<SavedEventWithDetails[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [categoryFilters, setCategoryFilters] = useState<string>("")

    useEffect(() => {
        setSavedEvents(savedEventsService.getSavedEventsByUser(userId));
    }, [userId]);

    const filteredSavedEvents = savedEventsService.filterSavedEvents(
        savedEvents,
        searchTerm,
        categoryFilters
    );

    const addSavedEvent = useCallback(
        (eventId: string) =>
            setSavedEvents(savedEventsService.addSavedEvent(userId, eventId)),
        [userId]
    );

    const isSaved = useCallback(
        (eventId: string) => savedEvents.some((event) => event.eventId === eventId),
        [savedEvents]
    )

    const removeSavedEvent = useCallback(
        (savedEventId: string) => 
            setSavedEvents(savedEventsService.removeSavedEvent(userId, savedEventId)),
        [userId]
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