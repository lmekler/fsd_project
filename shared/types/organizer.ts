import { Location } from "./Event";

export interface Organizer {
    id: number;
    name: string;
    description: string;
    website: string;
    email: string;
    phone: string;
    locationId: number;
    // location: Location;
    image: string;
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
