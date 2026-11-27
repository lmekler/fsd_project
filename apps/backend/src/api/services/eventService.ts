import type { Event, NewEventInput } from "@shared/types/event";
import { eventRepository } from "../repositories/eventRepository";
import { toTitle } from "@shared/utils/stringUtils";

export const eventService = {
  async getEvents(): Promise<Event[]> {
    return eventRepository.getAll();
  },

  async getEventById(id: number): Promise<Event | null> {
    return eventRepository.getById(id);
  },

  async addEvent(input: NewEventInput): Promise<Event> {
    return eventRepository.add({
      ...input,
      title: toTitle(input.title)
    });
  },

  async removeEvent(id: number): Promise<boolean> {
    return eventRepository.remove(id);
  },
};
