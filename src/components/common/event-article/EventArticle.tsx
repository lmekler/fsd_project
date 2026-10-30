import type { Location } from "../../../types/Event";

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
            <h2 className="section-title mb-4">
                {title}
            </h2>
            <div className="muted-text mb-4 flex flex-col gap-1">
                <p className="font-medium text-text">Location: {location.venue}</p>
                <p>{location.address}, {location.city}</p>
                <p className="font-medium text-text">Date: {date}</p>
                <p className="font-medium text-text"><strong>Time:</strong> {
                    endTime ? `${startTime} - ${endTime}`
                    : `${startTime}`
                }</p>
            </div>
            <p className="body-text mb-4 leading-relaxed">
                {description || "No description available."}
            </p>
            <p className="muted-text">
                <span className="font-medium text-text">
                    Category:
                </span>{" "}
                {category || "Unassigned"}
            </p>
        </article>
    )
}