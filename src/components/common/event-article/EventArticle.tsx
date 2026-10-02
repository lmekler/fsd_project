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
        <article className="event-article">
            <div className="info-container">
                <h2 className="article-title">{title}</h2>
                <div className="event-details-container">
                    <p className="event-location">Location: {location.venue}</p>
                    <p className="address">{location.address}, {location.city}</p>
                    <p className="event-date"><strong>Date:</strong> {date}</p>
                    <p className="event-time"><strong>Time:</strong> {
                        endTime ? `${startTime} - ${endTime}`
                        : `${startTime}`
                    }</p>
                </div>
                <p className="event-description">{
                    description ? `${description}`
                    : 'No description available.'
                }</p>
                <p className="category">Category: {
                    category ? `${category}`
                    : 'Unassigned'
                }</p>
            </div>
        </article>
    )
}