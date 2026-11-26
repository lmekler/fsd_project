import { toOrganizer } from "../repositories/organizerRepository";
import type { 
    Organizer
} from "@shared/types/organizer";
import type {
    DbOrganizer
} from "../types/organizer";

import { organizerRepository } from "../repositories/organizerRepository";
import { NotFoundError } from "../errors/errors";

// Service Functions
export const organizerService = {
    async getAll(): Promise<Organizer[]> {
        const organizers: DbOrganizer[] =
            await organizerRepository.getAll();
        
        return organizers.map(toOrganizer);
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
