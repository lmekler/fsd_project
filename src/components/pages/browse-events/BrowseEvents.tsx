import { EventCard } from "../../common/event-card/EventCard"
import type { Event } from "../../../types/Event";

import { NewEventForm } from "./new-event-form/NewEventForm";
import Button from "../../common/button/Button";
import { useSavedEvents } from "../../../hooks/useSavedEvents";

export function BrowseEvents({events, setEvents} : {
    events: Event[],
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>,
})
{
    // Mocking user log in
    const mockedUserId: string = "user_001";

    // SavedEvent Hook
    const { addSavedEvent, isSaved } = useSavedEvents(mockedUserId);

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
        <main className="page-container">
            <section>
                <h2 className="page-title">Browsing Events in Winnipeg</h2>
                <div>
                    <NewEventForm handleSubmit={handleSubmit}/>
                </div>
                <br></br>
                <div className="browse-events-container">
                    {events.map((event) =>
                    (
                        <div className="surface-card flex h-full flex-col">
                            <EventCard key={event.title+event.date} event={event}/>
                            <Button
                                variant="secondary"
                                size="sm"
                                disabled={isSaved(event.id)}
                                onClick={() => addSavedEvent(event.id)}>
                                {isSaved(event.id) ? "Saved": "Save Event"}
                            </Button>
                            <Button 
                                variant="danger"
                                size="sm"
                                onClick=
                                {
                                    () => 
                                    {
                                        setEvents((events) => events.filter(currentEvent => currentEvent.id !== event.id))
                                    }
                                }
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </div>
                <br></br>
            </section>
        </main>
    )
}