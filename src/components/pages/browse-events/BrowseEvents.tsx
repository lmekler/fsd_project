import { EventCard } from "../../common/event-card/EventCard"
import type { Event } from "../../types/Event";
import { useEvents } from "../../../hooks/useEvents";
import { NewEventForm } from "./new-event-form/NewEventForm";
import Button from "../../common/button/Button";

export function BrowseEvents()
{
    const {
        events,
        addEvent,
        removeEvent
    } = useEvents()

    function handleSubmit(event: Event): void
    {
        addEvent(event)
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
                                variant="danger"
                                size="sm"
                                onClick=
                                {
                                    () => 
                                    {
                                        removeEvent(event.id)
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