import { useParams } from "react-router-dom";
import Button from "../../common/button/Button";
import EventArticle from "../../common/event-article/EventArticle";
import SearchForm from "./saved-events-forms/SearchForm";
import CategoryForm from "./saved-events-forms/CategoryForm";

import { useSavedEvents } from "../../../hooks/useSavedEvents";

export default function SavedEvents() {
    const { userId } = useParams<{ userId: string }>();
    const { 
        savedEvents,
        filteredSavedEvents,
        setSearchTerm,
        setCategoryFilters,
        removeSavedEvent
    } = useSavedEvents(userId ?? "");

    // Derive categories from saved events
    const categories: (string | undefined)[] = [
        ...new Set(savedEvents.map((savedEvent) => savedEvent.event.category))
    ];


    return (
        <main className="page-container grid grid-cols-1 gap-8 py-8 md:grid-cols-[1fr_280px]">

            {/* Saved Events Section */}

            <section>
                <h2 className="page-title mb-6">
                    Saved Events
                </h2>
                <div className="flex flex-col gap-6">
                    {filteredSavedEvents.map((event) =>
                        <div
                            key={event.savedEventId}
                            className="surface-card flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                            <EventArticle
                                title={event.event.title}
                                description={event.event.description}
                                category={event.event.category}
                                date={event.event.date}
                                startTime={event.event.startTime}
                                endTime={event.event.endTime}
                                location={event.event.location}
                            />
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => removeSavedEvent(event.savedEventId)}
                            >
                                Unsave
                            </Button>
                        </div>
                    )}

                    {/* Empty list messaging */}
                    {filteredSavedEvents.length === 0 && (
                        <p className="muted-text">
                            {
                                !userId 
                                ? "You must be logged in to see saved events."
                                : savedEvents.length === 0
                                    ? "You don't have any saved events."
                                    : "No saved events match your filters."
                            }
                        </p>
                    )}

                </div>
            </section>

            {/* Filters Section */}
            <aside className="surface-card h-fit p-6 md:sticky md:top-6">
                <h3 className="subsection-title mb-6">
                    Filter Events
                </h3>

                <div className="flex flex-col gap-6">
                    <SearchForm
                        onSearch={setSearchTerm}
                    />

                    <CategoryForm
                        categories={categories}
                        onCategoryFilter={setCategoryFilters}
                    />
                </div>
            </aside>
        </main>
    )
}