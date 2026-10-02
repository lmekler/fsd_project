import { useState } from "react";
import Button from "../../common/button/Button";
import EventArticle from "../../common/event-article/EventArticle";
import type { Event } from "../../types/Event";
import SearchForm from "./saved-events-forms/SearchForm";
import CategoryForm from "./saved-events-forms/CategoryForm";

export default function SavedEvents({
    savedEvents,
    removeSavedEvent
}: {
    savedEvents: Event[],
    removeSavedEvent: (eventId: string) => void
}) {

    // Set States
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [categoryFilters, setCategoryFilters] = useState<string>("")

    // Derive categories from saved events
    const categories: (string | undefined)[] = [
        ...new Set(savedEvents.map((savedEvent) => savedEvent.category))
    ];

    // Filtering logic
    const filteredEvents: Event[] = savedEvents.filter((event) => {

        // Check if there is any filtering submitted from forms
        const searchMatches: boolean = 
            searchTerm === "" ||
            event.title.toLowerCase().includes(searchTerm.toLowerCase());
        
        const categoryMatches: boolean = categoryFilters === "" || event.category === categoryFilters;
        
        return searchMatches && categoryMatches;
    })

    return (
        <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-[1fr_280px] md:px-6 lg:px-8">

            {/* Saved Events Section */}

            <section>
                <h2 className="mb-6 font-heading text-xl font-bold text-text">
                    Saved Events
                </h2>
                <div className="flex flex-col gap-6">
                    {filteredEvents.map((event) =>
                        <div
                            key={event.id}
                            className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6 shadow-sm sm:flex-row sm:items-start sm:justify-between">
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
                                variant="danger"
                                size="sm"
                                onClick={() => removeSavedEvent(event.id)}
                            >
                                Unsave
                            </Button>
                        </div>
                    )}

                    {/* No filter matches messaging */}
                    {filteredEvents.length === 0 && (
                        <p className="font-body text-text-muted">
                            No saved events match your filters.
                        </p>
                    )}

                </div>
            </section>

            {/* Filters Section */}
            <aside className="h-fit rounded-lg border border-border bg-surface p-6 shadow-sm md:sticky md:top-6">
                <h3 className="mb-6 font-heading text-xl font-bold text-text">
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