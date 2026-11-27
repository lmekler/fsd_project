import type { Event, NewEventInput } from "../types/event";
import { BASE_URL, readJson } from "./apiHandler";

const endpoint = `${BASE_URL}/api/events`;

export const eventRepository = {
  async getAll(): Promise<Event[]> {
    const response = await fetch(endpoint);
    return readJson<Event[]>(response);
  },

  async getById(id: number): Promise<Event | null> {
    const response = await fetch(`${endpoint}/${id}`);

    if (response.status === 404) return null;

    return readJson<Event>(response);
  },

  async add(input: NewEventInput): Promise<Event> {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    return readJson<Event>(response);
  },

  async remove(id: number): Promise<boolean> {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
    });

    if (response.status === 404) return false;

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return true;
  },
};
