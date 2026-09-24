import { useState } from "react";

import eventData from "../../../data.json"
import { EventCard } from "../../common/event-card/EventCard"
import type { Event } from "../../types/Event";

import { NewEventForm } from "./new-event-form/NewEventForm";

export function BrowseEvents()
{
    const [events, setEvents] = useState<Event[]>(eventData.events)

    function handleSubmit(event: Event): void
    {
        setEvents(events =>
        (
            [
                ...events,
                event
            ]
        ))
    }

    return (
        <main className="browse-events">
            <h2>Browsing Events in Winnipeg</h2>
            <NewEventForm handleSubmit={handleSubmit}/>
            {events.map((event) =>
            (
                <EventCard key={event.title} event={event}/>
            ))}
        </main>
    )
}