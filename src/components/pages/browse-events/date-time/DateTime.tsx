import './DateTime.css'
import type { Event } from '../../../types/Event'

export function DateTime(event: Event)
{
    return (
        <p className="date-time">
            {event.datetime.getDay().toString()}, 
            {event.datetime.getDate().toString()}, 
            {event.datetime.toLocaleTimeString()}
        </p>
    )
}