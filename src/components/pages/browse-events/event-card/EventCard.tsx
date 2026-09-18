import './EventCard.css'
import type { Event } from '../../../types/Event'

interface EventCardProps {
    event: Event
}

export function EventCard({event} : EventCardProps)
{
    const eventDate: Date = new Date(event.date)
    return (
        <article key={event.title} className="event">
            <img className="event-image" src={event.image} alt={event.title}/>
             <p className="event-description">
                <span className="event-name">{event.title}</span>
                <span className="event-date-time">
                    {eventDate.getDay().toString()}, 
                    {eventDate.getDate().toString()}, 
                    {event.startTime}
                </span>
                <span className="event-location">{event.location.address}</span>
                <span className="event-ticket-price">{event.isFree ? "Free" : "$" + event.price}</span>
            </p>
        </article>
    )
}