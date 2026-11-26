import { Request, Response, NextFunction } from "express";
import type { CreateOrganizer, Organizer } from "@shared/types/organizer";
import { organizerService } from "../services/organizerService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../constants/httpConstants";

export async function getAll(
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const organizers: Organizer[] = await organizerService.getOrganizers();

        res.status(HTTP_STATUS.OK).json(successResponse(organizers));
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
        const organizer = req.body as CreateOrganizer;
        const newOrganizer: Organizer = 
            await organizerService.addOrganizer(organizer);

        res.status(HTTP_STATUS.CREATED).json(successResponse(newOrganizer, "Organizer created"));
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
        const organizerId: number = Number(req.params.organizerId);
        await organizerService.removeOrganizer(organizerId);

        res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
}