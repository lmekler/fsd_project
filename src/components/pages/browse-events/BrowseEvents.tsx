import { EventCard } from "../../common/event-card/EventCard"
import type { Event } from "../../../types/Event";
import { useEvents } from "../../../hooks/useEvents";
import { NewEventForm } from "./new-event-form/NewEventForm";
import Button from "../../common/button/Button";
import { useSavedEvents } from "../../../hooks/useSavedEvents";

export function BrowseEvents()
{
    // Mocking user log in
    const mockedUserId: string = "user_001"

    // SavedEvent Hook
    const { addSavedEvent, isSaved } = useSavedEvents(mockedUserId)

    const {
        events,
        addEvent,
        removeEvent
    } = useEvents()

    function handleSubmit(event: Event): void
    {
        try 
        {
            addEvent(event);
        }
        catch (error) 
        {
            console.log(error);
        }
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
                        <div key={event.title + event.date} className="surface-card flex h-full flex-col">
                            <EventCard key={event.title+event.date} event={event}/>
                            <div className="mt-auto flex flex-col items-end gap-2 px-4 pb-4">
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
                                            removeEvent(event.id)
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