import { EventCard } from "../../common/event-card/EventCard";
import type { NewEventInput } from "../../../types/event";
import { useEvents } from "../../../hooks/useEvents";
import { NewEventForm } from "./new-event-form/NewEventForm";
import Button from "../../common/button/Button";
import { useSavedEvents } from "../../../hooks/useSavedEvents";

export function BrowseEvents() {
  // Mocking user log in
  const mockedUserId: number = 1;

  // SavedEvent Hook
  const { addSavedEvent, isSaved } = useSavedEvents(mockedUserId);

  const { events, loading, addEvent, removeEvent } = useEvents();

  function handleSubmit(input: NewEventInput): void {
    try {
      addEvent(input);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="page-container py-8">
      <section>
        <header className="mb-8">
          <h2 className="page-title mb-2">Browsing Events in Winnipeg</h2>
          <p className="muted-text">
            Discover and explore events happening in your city.
          </p>
        </header>

        <section className="surface-card mb-8 p-6">
          <h3 className="subsection-title mb-4">Create a New Event</h3>

          <NewEventForm handleSubmit={handleSubmit} />
        </section>

        <section>
          <h2 className="page-title mb-6">Upcoming Events</h2>

          {loading && <p className="muted-text">Loading events...</p>}

          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="surface-card flex min-w-0 flex-col gap-4 p-6"
              >
                <div className="min-w-0 flex-1">
                  <EventCard event={event} />
                </div>

                <div className="mt-auto flex flex-wrap gap-3 border-t border-slate-200 pt-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={isSaved(event.id)}
                    onClick={() => addSavedEvent(event.id)}
                  >
                    {isSaved(event.id) ? "Saved" : "Save Event"}
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      removeEvent(event.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {!loading && events.length === 0 && (
            <p className="muted-text">No events are available right now.</p>
          )}
        </section>
      </section>
    </main>
  );
}
