import { Request, Response, NextFunction } from "express";
import type { Event, NewEventInput } from "@shared/types/event";
import { eventService } from "../services/eventService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../constants/httpConstants";

export const eventController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const events: Event[] = await eventService.getEvents();
      res
        .status(HTTP_STATUS.OK)
        .json(successResponse(events, "Events retrieved successfully"));
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await eventService.getEventById(Number(req.params.id));
      if (!event) {
        res.status(404).json({ error: "Event not found" });
        throw Error(`Event with ID ${req.params.id} not found`);
      }
      res
        .status(HTTP_STATUS.OK)
        .json(successResponse(event, "Event retrieved successfully"));
    } catch (error) {
      next(error);
    }
  },

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await eventService.addEvent(req.body as NewEventInput);
      res
        .status(HTTP_STATUS.OK)
        .json(successResponse(event, "Event created successfully"));
    } catch (error) {
      next(error);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const removed = await eventService.removeEvent(Number(req.params.id));
      if (!removed) {
        res.status(404).json({ error: "Event not found" });
        throw Error(`Event with ID ${req.params.id} not found`);
      }
      res
        .status(HTTP_STATUS.OK)
        .json(successResponse(null, "Event deleted successfully"));
    } catch (error) {
      next(error);
    }
  },
};
