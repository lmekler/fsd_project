import type { Event } from '../../types/Event'

interface EventCardProps 
{
    event: Event
}

export function EventCard({event} : EventCardProps)
{
    return (
        <article
            className="flex flex-col"
            key={event.title}
        >
            <img 
                className="event-image w-full rounded-t-lg object-cover" 
                src={event.image} 
                alt={event.title}
            />
             <p className="body-text p-3">
                <span className="subsection-title">{event.title}</span>
                <br></br>
                <span className="event-date-time">
                    {new Date(event.date).toLocaleString(
                        'en-us', 
                        {
                            weekday: "long", 
                            day: "numeric", 
                            month: "short"
                        }
                    )}
                    {", " + event.startTime}
                </span>
                <br></br>
                <span className="event-location">{event.location.address}</span>
                <br></br>
                <span className="event-ticket-price">{event.isFree ? "Free" : "$" + event.price}</span>
            </p>
        </article>
    )
}