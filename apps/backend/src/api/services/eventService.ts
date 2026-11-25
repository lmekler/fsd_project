import type { Event } from "@shared/types/Event";
import { eventRepository } from "../repositories/eventRepository";
import { toTitle } from "@shared/utils/stringUtils";

export const eventService = {
  async getEvents(): Promise<Event[]> {
    return eventRepository.getAll();
  },

  async getEventById(id: number): Promise<Event | null> {
    return eventRepository.getById(id);
  },

  async addEvent(
    input: Omit<Event, "id">,
    organizerId: number,
  ): Promise<Event> {
    return eventRepository.add({
      ...input,
      title: toTitle(input.title),
      organizerId: organizerId,
      registeredCount: 0,
      isFeatured: false,
    });
  },

  async removeEvent(id: number): Promise<boolean> {
    return eventRepository.remove(id);
  },
};
