import { useState } from "react";
import * as savedEventsService from "../services/savedEventsService";
import type { SavedEventWithDetails } from "../types/Event";

export function useSavedEvents(userId: string) {
    const [savedEvents, setSavedEvents] = useState<SavedEventWithDetails[]>(
        () => savedEventsService.getSavedEventsByUser(userId)
    );

    return {
        savedEvents
    }
}