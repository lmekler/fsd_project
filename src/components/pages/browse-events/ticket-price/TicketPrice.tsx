import './TicketPrice.css'
import type { Event } from '../../../types/Event'

export function TicketPrice(event: Event)
{
    return (
        <p className="event-ticket-price">{"$" + event.ticketPrice || "Free"}</p>
    )
}