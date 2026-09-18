export interface Organizer {
    id: string;
    name: string;
    description: string;
    website: string;
    email: string;
    phone: string
    location: Location;
}

interface Location {
    city: string;
    province: string;
    country: string;
}
