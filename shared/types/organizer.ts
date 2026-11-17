export interface Organizer {
    id: number;
    name: string;
    description: string;
    website: string;
    email: string;
    phone: string
    location: Location;
    image: string;
}

interface Location {
    city: string;
    province: string;
    country: string;
}

export interface CreateOrganizer {
    name: string;
    description: string;
    website: string;
    email: string;
    phone: string
    location: {
        city: string;
        province: string;
    };
}
