import { EventCard } from "../../common/event-card/EventCard"
import type { Event } from "../../types/Event";

import { NewEventForm } from "./new-event-form/NewEventForm";
import Button from "../../common/button/Button";

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
        <main className="page-container py-8">
            <section className="flex flex-col gap-8">
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
                            <div className="mt-auto flex justify-end px-4 pb-4">
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
                        </div>
                    ))}
                </div>
                <br></br>
            </section>
        </main>
    )
}