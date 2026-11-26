import type {
    Location
} from "@shared/types/event";
import type { 
    Organizer
} from "@shared/types/organizer";
import type {
    DbOrganizer
} from "../types/organizer";
import type {
    DbLocation
} from "../types/event";
import { organizerRepository } from "../repositories/organizerRepository";
import { NotFoundError } from "../errors/errors";

// Mapping functions - converts from DB Types to Shared Types

function toLocation(loc: DbLocation): Location {
    return { ...loc, venue: loc.venue ?? undefined };
}

function toOrganizer(organizer: DbOrganizer): Organizer {
    return {
        ...organizer,
        name: organizer.name,
        description: organizer.description,
        website: organizer.website,
        phone: organizer.phone,
        email: organizer.email ?? undefined,
        image: organizer.image,
        locationId: organizer.locationId,
        location: toLocation(organizer.location),
    };
}

// Service Functions
export const organizerService = {
    async getAll(): Promise<Organizer[]> {
        const savedorganizers: DbOrganizer[] =
            await organizerRepository.getAll();
        
        return savedorganizers.map(toOrganizer);
    },

    async add(): Promise<Organizer> {
        const newOrganizer: DbOrganizer = 
            await organizerRepository.add();
        
        return toOrganizer(newOrganizer);
    },

    async remove(
        organizerId: number
    ): Promise<void> {
        const removedOrganizer: boolean = await organizerRepository.remove(organizerId);

        if (!removedOrganizer) {
            throw new NotFoundError("Organizer not found.");
        }
    }
}
