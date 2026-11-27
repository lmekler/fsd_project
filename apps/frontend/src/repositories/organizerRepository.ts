import type { Organizer, CreateOrganizer } from "../types/organizer";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const endpoint = `${baseUrl}/api/organizers`;

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return (await response.json()) as T;
}

export const organizerRepository = {
  async getAll(): Promise<Organizer[]> {
    const response = await fetch(endpoint);
    return readJson<Organizer[]>(response);
  },

  async add(input: CreateOrganizer): Promise<Organizer> {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    return readJson<Organizer>(response);
  },

  async remove(id: number): Promise<void> {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.message || "Failed to delete organizer.");
    }
  },
};
