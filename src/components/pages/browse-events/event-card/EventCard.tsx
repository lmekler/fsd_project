import './EventCard.css'
import type { Event } from '../../../types/Event'

interface EventCardProps {
    event: Event
}

export function EventCard({event} : EventCardProps)
{
    return (
        <article key={event.name} className="event">
            <img className="event-image" src={event.image} alt={event.name}/>
             <p className="event-description">
                <span className="event-name">{event.name}</span>
                <span className="event-date-time">
                    {event.dateTime.getDay().toString()}, 
                    {event.dateTime.getDate().toString()}, 
                    {event.dateTime.toLocaleTimeString()}
                </span>
                <span className="event-location">{event.location}</span>
                <span className="event-ticket-price">{"$" + event.ticketPrice || "Free"}</span>
            </p>
        </article>
    )
}