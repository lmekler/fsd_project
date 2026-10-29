import type { CreateOrganizer, Organizer } from "../components/types/Organizer";
import { organizerRepository } from "../repositories/organizerRepository";

function validateOrganizer(
    input: CreateOrganizer
): void {
    const errors: string[] = [];

    const websiteRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (input.name.trim().length < 3) {
        errors.push("First name must be at least 3 characters long.");
    }

    if (!input.description.trim()) {
        errors.push("Description is required.");
    }

    if (!websiteRegex.test(input.website)) {
        errors.push("Website is invalid.");
    }

    if (!emailRegex.test(input.email)) {
        errors.push("Email is invalid.");
    }

    if (!phoneRegex.test(input.phone)) {
        errors.push("Phone number is invalid.");
    }

    if (!input.location.city.trim()) {
        errors.push("City is required.");
    }    
    
    if (errors.length > 0) {
        throw new Error(errors.join(" "));
    }
}

export const organizerService = {
    async getOrganizers(): Promise<Organizer[]> {
        return organizerRepository.getAll();
    },

    async addOrganizer(
        input: CreateOrganizer
    ): Promise<Organizer> {
        const organizerInput: CreateOrganizer = {
            ...input,
            name: input.name.trim(),
            description: input.description.trim(),
            website: input.website.trim(),
            phone: input.phone.trim(),
            email: input.email.trim(),
            location: {
                city: input.location.city.trim(),
                province: input.location.province
            }
        }

        validateOrganizer(organizerInput);

        return organizerRepository.add(organizerInput);
    }
};
