import eventData from "../components/data/data.json"
import type { Event } from "../components/types/Event"

let events: Event[] = []

for (const event of eventData.events) 
{
    events.push(event)
}

export const eventRepository = 
{
    getAll(): Event[] 
    {
        return events.map((event) =>
        ({
            ...event
        }))
    },

    getById(id: string): Event | null 
    {
        const event = events.find((event) => event.id === id)

        return event ? { ...event } : null
    },

    add(input: Event): Event 
    {
        let nextId: string = "event_" + crypto.randomUUID()

        const event: Event =
        {
            id: nextId,
            organizerId: input.organizerId,
            title: input.title,
            description: input.description,
            category: input.category,
            date: input.date,
            startTime: input.startTime,
            endTime: input.endTime,
            location: input.location,
            image: input.image,
            capacity: input.capacity,
            registeredCount: input.registeredCount,
            price: input.price,
            isFree: input.isFree,
            isFeatured: input.isFeatured,
            tags: input.tags
        }

        events = [...events, event]

        return { ...event };
    },

    remove(id: string): void
    {
        events = events.filter((event) => event.id !== id)
    }
}