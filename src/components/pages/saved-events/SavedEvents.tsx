import EventArticle from "../../common/event-article/EventArticle";
import type { Event } from "../../types/Event";

export default function SavedEvents({
    savedEvents,
    setSavedEvents
}: {
    savedEvents: Event[],
    setSavedEvents: React.Dispatch<React.SetStateAction<Event[]>>
}) {

    return (
        <>
            <h2>Saved Events</h2>
            {savedEvents.map((event) =>
                <EventArticle
                    key={event.id}
                    title={event.title}
                    description={event.description}
                    category={event.category}
                    date={event.date}
                    startTime={event.startTime}
                    endTime={event.endTime}
                    location={event.location}
                />)}
        </>
    )
}