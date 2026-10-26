import { useCallback, useEffect, useState } from "react";
import * as savedEventsService from "../services/savedEventsService";
import type { SavedEventWithDetails } from "../types/Event";

export function useSavedEvents(userId: string) {
    const [savedEvents, setSavedEvents] = useState<SavedEventWithDetails[]>([]);

    useEffect(() => {
        setSavedEvents(savedEventsService.getSavedEventsByUser(userId));
    }, [userId]);

    const removeSavedEvent = useCallback(
        (savedEventId: string) => 
            setSavedEvents(savedEventsService.removeSavedEvent(userId, savedEventId)),
        [userId]
    )

    return {
        savedEvents,
        removeSavedEvent
    }
}