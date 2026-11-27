import type { CreateOrganizer, Organizer } from "@shared/types/organizer";
import { organizerRepository } from "../repositories/organizerRepository";

export const organizerService = {
    async getOrganizers(): Promise<Organizer[]> {
        return organizerRepository.getAll();
    },

    async addOrganizer(
        input: CreateOrganizer
    ): Promise<Organizer> {
        return organizerRepository.add(input);
    },

    async removeOrganizer(id: number): Promise<boolean> {
        return await organizerRepository.remove(id);
    },
};
