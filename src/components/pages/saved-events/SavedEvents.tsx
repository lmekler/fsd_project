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
        <main className="saved-events-page">
            <h2>Saved Events</h2>

            <SearchForm
                onSearch={setSearchTerm}
            />

            <CategoryForm
                categories={categories}
                onCategoryFilter={setCategoryFilters}
            />

            {filteredEvents.map((event) =>
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
                        variant="danger"
                        size="sm"
                        onClick={() => removeSavedEvent(event.id)}
                    >
                        Unsave
                    </Button>
                </div>
            )}
        </main>
    )
}