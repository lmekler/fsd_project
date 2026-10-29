import organizerData from "../components/data/data.json"
import { useState } from "react";
import type { Organizer, CreateOrganizer } from "../components/types/Organizer";

const [organizers, setOrganizers] = useState(organizerData.organizers);

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

    setOrganizers(prevOrganizers => [
        ...prevOrganizers,
        organizer
    ])

    return { ...organizer };
  }
};
