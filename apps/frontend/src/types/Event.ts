export interface Event
{
    id: string
    organizerId: string
    title: string
    description?: string
    category?: string
    date: string
    startTime: string
    endTime?: string
    location: Location
    image?: string
    capacity: number
    registeredCount: number
    price: number
    isFree: boolean
    isFeatured: boolean
    tags?: string[]
}

export interface Location 
{
    venue?: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
}

export interface SavedEvent {
    savedEventId: string;
    userId: string;
    eventId: string;
}

export interface SavedEventWithDetails extends SavedEvent {
    event: Event
}