import './EventCard.css'
import type { Event } from "../../types/Event"

interface EventCardProps 
{
    event: Event
}

export function EventCard({event} : EventCardProps)
{
    const eventDate: Date = new Date(`${event.date}T${event.startTime}`)
    
    return (
        <article key={event.title} className="event">
            <img className="event-image" src={event.image} alt={event.title}/>
             <p className="event-description">
                <span className="event-name">{event.title}</span>
                <br></br>
                <span className="event-date-time">
                    {eventDate.toLocaleString(
                        'en-us', 
                        {
                            weekday: "long", 
                            day: "numeric", 
                            month: "short", 
                            hour12: true, 
                            hour: "numeric", 
                            minute: "numeric"
                        }
                    )}
                </span>
                <br></br>
                <span className="event-location">{event.location.address}</span>
                <br></br>
                <span className="event-ticket-price">{event.isFree ? "Free" : "$" + event.price}</span>
            </p>
        </article>
    )
}