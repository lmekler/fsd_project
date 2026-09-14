import './location.css'
import type { Event } from '../../../types/Event'

export function Location(event: Event)
{
    return (
        <p className="event-location">{event.location}</p>
    )
}