import type { Request, Response } from "express";
import type { Event } from "@shared/types/Event";
import { eventService } from "../services/eventService";

export const eventController = {
  async getAll(_req: Request, res: Response) {
    const events = await eventService.getEvents();
    res.json(events);
  },

  async getById(req: Request, res: Response) {
    const event = await eventService.getEventById(Number(req.params.id));

    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    res.json(event);
  },

  async add(req: Request, res: Response) {
    const event = await eventService.addEvent(req.body as Omit<Event, "id">);

    res.status(201).json(event);
  },

  async remove(req: Request, res: Response) {
    const removed = await eventService.removeEvent(Number(req.params.id));

    if (!removed) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    res.sendStatus(204);
  },
};
