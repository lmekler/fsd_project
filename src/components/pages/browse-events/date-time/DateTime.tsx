import './DateTime.css'
import type { Event } from '../../../types/Event'

export function DateTime(event: Event)
{
    return (
        <p className="event-date-time">
            {event.dateTime.getDay().toString()}, 
            {event.dateTime.getDate().toString()}, 
            {event.dateTime.toLocaleTimeString()}
        </p>
    )
}