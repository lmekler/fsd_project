import type { CreateOrganizer } from "../components/types/Organizer";
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
        let isValid: boolean = true;
        const errors: OrganizerErrors = {location: { city: ''}};

        const websiteRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const phoneRegex = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

        if (input.name.trim().length < 3) {
            errors.name = "First name must be at least 3 characters long.";
            isValid = false;
        }

        if (!input.description.trim()) {
            errors.description = "Description is required.";
            isValid = false;
        }

        if (!websiteRegex.test(input.website)) {
            errors.website = "Website is invalid.";
            isValid = false;
        }

        if (!emailRegex.test(input.email)) {
            errors.email = "Email is invalid.";
            isValid = false;
        }

        if (!phoneRegex.test(input.phone)) {
            errors.phone = "Phone number is invalid.";
            isValid = false;
        }

        if (!input.location.city.trim()) {
            errors.location.city = "City is required.";
            isValid = false;
        }

        return errors;
    },

    async addOrganizer(
        input: CreateOrganizer
    ): Promise<OrganizerErrors | object> {
        const errors = await this.validateOrganizer(input);

        if (Object.keys(errors).length > 0) {
            return errors;
        }

        await organizerRepository.add(input);

        return {};
    }
};
