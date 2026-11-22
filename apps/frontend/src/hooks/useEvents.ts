import { useState, useEffect } from "react";
import { eventService } from "../services/eventService";
import type { Event, NewEventInput } from "../types/Event";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadEvents() {
      try {
        const data = await eventService.getEvents();
        if (!ignore) setEvents(data);
      } catch (err) {
        if (!ignore) {
          setError("Failed to load events.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadEvents();

    return () => {
      ignore = true;
    };
  }, []);

  async function getEventById(id: number): Promise<Event | null> {
    return eventService.getEventById(id);
  }

  async function addEvent(input: NewEventInput): Promise<boolean> {
    setError(null);

    try {
      const event = await eventService.addEvent(input);

      setEvents((current) => [...current, event]);

      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to add event.");

      return false;
    }
  }

  async function removeEvent(id: number): Promise<boolean> {
    setError(null);

    try {
      await eventService.removeEvent(id);

      setEvents((current) => current.filter((event) => event.id !== id));

      return true;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to remove event.",
      );

      return false;
    }
  }

  return {
    events,
    loading,
    error,
    getEventById,
    addEvent,
    removeEvent,
  };
}
