import eventData from "../../../data.json"
import { EventCard } from "./event-card/EventCard";
import type { Event } from "../../types/Event";

export function BrowseEvents()
{
    const events: Event[] = eventData.events

    return (
        <main className="browse-events">
            <h2>Browsing Events in Winnipeg</h2>
            {events.map((event) =>
            (
                <EventCard key={event.title} event={event}/>
            ))}
        </main>
    )
}