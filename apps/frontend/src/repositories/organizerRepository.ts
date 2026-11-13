import organizerData from "../data/data.json"
import type { Organizer, CreateOrganizer } from "../types/Organizer";

let organizers: Organizer[] = organizerData.organizers.map((organizer) => ({
  ...organizer
}));

const prefix: string = "org-";
const nextId: string = `${prefix + crypto.randomUUID()}`;

export const organizerRepository = {
  async getAll(): Promise<Organizer[]> {
    return organizers.map((organizer) => ({
      ...organizer,
    }));
  },

  async getById(id: string): Promise<unknown | undefined> {
    const organizer = organizers.find(
        organizer => organizer.id === id
    );

    if (organizer) {
        return {
            ...organizer,
            organizer: organizer.name
        }
    }
  },

  async add(input: CreateOrganizer): Promise<Organizer> {
    const organizer: Organizer = {
        id: nextId,
        name: input.name,
        description: input.description,
        website: input.website,
        email: input.email,
        phone: input.phone,
        location: {
            city: input.location.city,
            province: input.location.province,
            country: "Canada"
        },
        image: ""
    };

    organizers = [
      ...organizers,
      organizer
    ]

    return { ...organizer };
  },

  async remove(id: string): Promise<boolean> {
    const originalLength = organizers.length;

    organizers = organizers.filter(
      (organizer) => organizer.id !== id,
    );

    return organizers.length < originalLength;
  },
};
