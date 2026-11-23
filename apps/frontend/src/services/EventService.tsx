import type { Event, NewEventInput } from "../types/event";
import { eventRepository } from "../repositories/eventRepository";
import { toTitle } from "@shared/utils/stringUtils";

function validateEvent(event: NewEventInput): void {
  const errors: string[] = [];

  if (!event.image) errors.push("Image is required.");
  if (!event.title?.trim()) errors.push("Title is required.");

  if (event.description && event.description.length >= 500) {
    errors.push("Description cannot exceed 500 characters.");
  }

  if (!event.date) errors.push("Date is required.");

  if (!event.location?.address) errors.push("Address is required.");
  if (!event.location?.city) errors.push("City is required.");
  if (!event.location?.province) errors.push("Province is required.");
  if (!event.location?.postalCode) errors.push("Postal code is required.");

  if (errors.length > 0) throw new Error(errors.join(" "));
}

export const eventService = {
  async getEvents(): Promise<Event[]> {
    return eventRepository.getAll();
  },

  async getEventById(id: number): Promise<Event | null> {
    return eventRepository.getById(id);
  },

  async addEvent(input: NewEventInput): Promise<Event> {
    const event: NewEventInput = {
      ...input,
      title: toTitle(input.title),
    };

    validateEvent(event);

    return eventRepository.add({
      ...input,
      title: toTitle(input.title),
    });
  },

  async removeEvent(id: number): Promise<boolean> {
    return eventRepository.remove(id);
  },
};
