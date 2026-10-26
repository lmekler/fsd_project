import organizerData from "../components/data/data.json"
import { useState } from "react";
import type { Organizer } from "../components/types/Organizer";

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
  }
};
