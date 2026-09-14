import './EventName.css'
import type { Event } from '../../../types/Event'

export function EventName(event: Event)
{
    return (
        <p className="event-name">{event.name}</p>
    )
}