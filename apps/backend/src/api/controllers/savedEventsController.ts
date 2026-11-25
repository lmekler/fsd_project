import { Request, Response, NextFunction } from "express";
import type { SavedEventWithDetails } from "@shared/types/event";
import { savedEventsService } from "../services/savedEventsService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../constants/httpConstants";

export async function getAllByUser(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId: number = Number(req.params.userId);
        const savedEvents: SavedEventWithDetails[] = await savedEventsService.getAllByUser(userId);

        res.status(HTTP_STATUS.OK).json(successResponse(savedEvents));
    } catch (error) {
        next(error);
    }
}

export async function add(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId: number = Number(req.params.userId);
        const { eventId } = req.body as { eventId: number };
        const createdEvent: SavedEventWithDetails = 
            await savedEventsService.add(userId, eventId);

        res.status(HTTP_STATUS.CREATED).json(successResponse(createdEvent, "Event saved"));
    } catch (error) {
        next(error);
    }
}

export async function remove(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId: number = Number(req.params.userId);
        const savedEventId: number = Number(req.params.savedEventId);
        await savedEventsService.remove(userId, savedEventId);

        res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
}