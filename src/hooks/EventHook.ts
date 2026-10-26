import { useState } from "react";
import { eventService } from "../services/EventService"
import type { Event } from "../components/types/Event"

export function useEvents() 
{
    const [events, setEvents] = useState<Event[]>(eventService.getEvents())

    function getEventById(id: string): Event | null
    {
        return eventService.getEventById(id)
    }

    function addEvent(input: Event): void
    {
        eventService.addEvent(input)
        setEvents(eventService.getEvents())
    }

    function removeEvent(id: string): void
    {
        eventService.removeEvent(id)
        setEvents(eventService.getEvents())
    }

    return (
    {
        events,
        getEventById,
        addEvent,
        removeEvent
    })
}