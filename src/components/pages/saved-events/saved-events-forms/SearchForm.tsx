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
            className="form-group"
        >
            <label
                htmlFor="event-search"
                className="form-label"
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
                    className="form-control"
                />

                <Button type="submit">
                    Search
                </Button>
            </div>

            {searchErrors && (
                <p 
                    role="alert"
                    className="form-error"
                >
                    {searchErrors}
                </p>
            )}
        </form>
    )
}