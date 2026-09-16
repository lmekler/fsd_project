import data from "../../../data.json"

interface EventStructure {
    id: string;
    organizerId: string;
    title: string;
    description: string;
    category: string;
    date: string;
    startTime: string;
    endTime: string;
    location: Location;
    image: string;
    capacity: number;
    registeredCount: number;
    price: number;
    isFree: boolean;
    isFeatured: boolean;
    tags: string[];
}

interface Location {
    venue: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
}

interface SavedEventProps {
    title: string;
    description: string;
    category: string;
    date: string;
    startTime: string;
    endTime: string;
    location: Location;
}

function EventEntry({
    title,
    description,
    category,
    date,
    startTime,
    endTime,
    location
}: SavedEventProps) {
    return (
        <article className="event-entry">
            <div className="info-container">
                <h2 className="entry-title">{title}</h2>
                <div className="event-details-container">
                    <p className="event-location">Location: {location.venue}</p>
                    <p className="address">{location.address}, {location.city}</p>
                    <p className="event-date"><strong>Date:</strong> {date}</p>
                    <p className="event-time"><strong>Time:</strong> {startTime} - {endTime}</p>
                </div>
                <p className="event-description">{description}</p>
                <p className="category">Category: {category}</p>
            </div>
        </article>
    )
}

function RenderEvents({ events }: {events: EventStructure[] }) {
    return (
        <>
            {events.map((entry) =>
                <EventEntry
                    key={entry.id}
                    title={entry.title}
                    description={entry.description}
                    category={entry.category}
                    date={entry.date}
                    startTime={entry.startTime}
                    endTime={entry.endTime}
                    location={entry.location}
                />)}
        </>
    )
}

export default function SavedEvents() {
    
    const parsedData: EventStructure[] = data.savedEvents;

    return (
        <>
            <h2>Saved Events</h2>
            <RenderEvents events={parsedData}/>
        </>
    )
}