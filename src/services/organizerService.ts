import type { CreateOrganizer, Organizer } from "../components/types/Organizer";
import { organizerRepository } from "../repositories/organizerRepository";

export type OrganizerErrors = {
    name?: string;
    description?: string;
    website?: string;
    email?: string;
    phone?: string;
    location: {
        city: string;
    }
};

export const organizerService = {
    async validateOrganizer(
        input: CreateOrganizer
    ): Promise<OrganizerErrors> {
        const errors: OrganizerErrors = {location: { city: ''}};

        const websiteRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const phoneRegex = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

        if (input.name.trim().length < 3) {
            errors.name = "First name must be at least 3 characters long.";
        }

        if (!input.description.trim()) {
            errors.description = "Description is required.";
        }

        if (!websiteRegex.test(input.website)) {
            errors.website = "Website is invalid.";
        }

        if (!emailRegex.test(input.email)) {
            errors.email = "Email is invalid.";
        }

        if (!phoneRegex.test(input.phone)) {
            errors.phone = "Phone number is invalid.";
        }

        if (!input.location.city.trim()) {
            errors.location.city = "City is required.";
        }

        return errors;
    },

    async getOrganizers(): Promise<Organizer[]> {
        return organizerRepository.getAll();
    },

    async addOrganizer(
        input: CreateOrganizer
    ): Promise<OrganizerErrors | object> {
        const errors = await this.validateOrganizer(input);

        if (Object.keys(errors).length > 0) {
            return errors;
        }

        return organizerRepository.add(input);
    }
};
