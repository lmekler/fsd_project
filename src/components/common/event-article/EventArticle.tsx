import type { Location } from "../../types/Event";

interface EventArticleProps {
    title: string;
    description?: string;
    category?: string;
    date: string;
    startTime: string;
    endTime?: string;
    location: Location;
}

export default function EventArticle({
    title,
    description,
    category,
    date,
    startTime,
    endTime,
    location
}: EventArticleProps) {
    return (
        <article className="flex-1">
            <div className="info-container">
                <h2 className="mb-4 font-heading text-2xl font-bold text-text">
                    {title}
                </h2>
                <div className="mb-4 flex flex-col gap-1 font-body text-sm text-text-muted">
                    <p className="event-location">Location: {location.venue}</p>
                    <p className="address">{location.address}, {location.city}</p>
                    <p className="event-date"><strong>Date:</strong> {date}</p>
                    <p className="event-time"><strong>Time:</strong> {
                        endTime ? `${startTime} - ${endTime}`
                        : `${startTime}`
                    }</p>
                </div>
                <p className="mb-4 font-body text-base leading-relaxed text-text">{
                    description ? `${description}`
                    : 'No description available.'
                }</p>
                <p className="font-medium text-text">Category: {
                    category ? `${category}`
                    : 'Unassigned'
                }</p>
            </div>
        </article>
    )
}