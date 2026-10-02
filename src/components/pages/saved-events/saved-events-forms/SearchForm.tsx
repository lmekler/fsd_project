import React, { useState } from "react";
import Button from "../../../common/button/Button";

export default function SearchForm({
    onSearch
}: { 
    onSearch: (searchTerm: string) => void
}) {
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchErrors, setSearchErrors] = useState<string>(""); // For validation

    // Handlers & Validation
    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        const search: string = searchValue.trim();

        if (search && search.length < 2) {
            setSearchErrors("Search must be at least 2 characters.");
            return;
        }

        setSearchErrors("");
        onSearch(search);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
        >
            <label
                htmlFor="event-search"
                className="font-body text-sm font-medium text-text"
            >
                Search Saved Events
            </label>
            <div className="flex gap-2">
                <input
                    id="event-search"
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search event"
                    className="w-full rounded-md border border-border bg-surface px-3 py-2.5 font-body text-base text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <Button type="submit">
                    Search
                </Button>
            </div>

            {searchErrors && (
                <p 
                    role="alert"
                    className="font-body text-sm text-error"
                >
                    {searchErrors}
                </p>
            )}
        </form>
    )
}