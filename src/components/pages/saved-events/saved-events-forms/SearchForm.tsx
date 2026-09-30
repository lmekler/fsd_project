import React, { useState } from "react";
import Button from "../../../common/button/Button";

export default function SearchForm({
    onSearch
}: { 
    onSearch: (searchTerm: string) => void
}) {
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchErrors, setSearchErrors] = useState<string>(""); // For validation

    // Handlers
    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        const search: string = searchValue.trim();

        if (!search) {
            setSearchErrors("Please enter a search term.");
            return;
        }

        if (search.length < 2) {
            setSearchErrors("Search must be at least 2 characters.");
            return;
        }

        setSearchErrors("");
        onSearch(search);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="event-search">
                Search Saved Events
            </label>

            <input
                id="event-search"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search event"
            />

            <Button type="submit">
                Search
            </Button>

            {searchErrors && (
                <p role="alert">{searchErrors}</p>
            )}
        </form>
    )
}