import { EventCard } from "../../common/event-card/EventCard"
import type { Event } from "../../types/Event";

import { NewEventForm } from "./new-event-form/NewEventForm";

export function BrowseEvents({events, setEvents} : {events: Event[], setEvents: React.Dispatch<React.SetStateAction<Event[]>>})
{
    function handleSubmit(event: Event): void
    {
        setEvents(events =>
        (
            [
                event,
                ...events
            ]
        ))
    }

    return (
        <main className="browse-events">
            <h2>Browsing Events in Winnipeg</h2>
            <NewEventForm handleSubmit={handleSubmit}/>
            {events.map((event) =>
            (
                <div>
                    <EventCard key={event.title+event.date} event={event}/>
                    <button onClick=
                        {
                            () => 
                            {
                                setEvents((events) => events.filter(currentEvent => currentEvent.id !== event.id))
                            }
                        }
                    >
                        Delete
                    </button>
                </div>
            ))}
        </main>
    )
}