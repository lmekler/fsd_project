import "./Image.css"
import type { Event } from '../../../types/Event'

export function Image(event: Event)
{
    return (
        <img className="event-image" src={event.image} alt={event.name}/>
    )
}