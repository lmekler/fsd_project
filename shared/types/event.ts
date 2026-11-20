export interface Event
{
    id: number
    organizerId: number
    title: string
    description?: string
    category?: string
    date: string
    startTime: string
    endTime?: string
    locationId: number
    // location: Location
    image?: string
    capacity: number
    registeredCount: number
    price: number
    // isFree: boolean
    isFeatured: boolean
    tags?: string[]
}

export interface Location 
{
    id: number;
    venue: string | null;
    address: string;
    city: string;
    province: string;
    postalCode: string;
}

export interface SavedEvent {
    savedEventId: number;
    userId: number;
    eventId: number;
}

export interface SavedEventWithDetails extends SavedEvent {
    event: Event
}