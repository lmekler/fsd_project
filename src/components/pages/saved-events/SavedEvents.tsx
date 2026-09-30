import Button from "../../common/button/Button";
import EventArticle from "../../common/event-article/EventArticle";
import type { Event } from "../../types/Event";

export default function SavedEvents({
    savedEvents,
    removeSavedEvent
}: {
    savedEvents: Event[],
    removeSavedEvent: (eventId: string) => void
}) {

    return (
        <>
            <h2>Saved Events</h2>
            {savedEvents.map((event) =>
                <div key={event.id} className="saved-event-container">
                    <EventArticle
                        title={event.title}
                        description={event.description}
                        category={event.category}
                        date={event.date}
                        startTime={event.startTime}
                        endTime={event.endTime}
                        location={event.location}
                    />
                    <Button
                        onClick={() => removeSavedEvent(event.id)}
                    >
                        Unsave
                    </Button>
                </div>
            )}
        </>
    )
}