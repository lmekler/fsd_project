import type { DbSavedEventWithDetails } from "../types/event";
import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../db/prisma";
import { ConflictError, NotFoundError } from "../errors/errors";

// Avoids including every user's saved event rows
const eventInclude = {
    organizer: { include: { location: true }},
    location: true,
} as const;

const savedEventWithDetailsInclude = {
    event: { include: eventInclude },
} as const;

export const savedEventsRepository = {
    async getAllWithDetailsByUser(userId: number): Promise<DbSavedEventWithDetails[]> {
        return prisma.savedEvent.findMany({
            where: { userId },
            include: savedEventWithDetailsInclude
        });
    },

    async add(userId: number, eventId: number): Promise<DbSavedEventWithDetails> {
        try {
            return await prisma.savedEvent.create({ 
                data: { userId, eventId },
                include: savedEventWithDetailsInclude
            });
        } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                throw new ConflictError("Event already saved.");
            }
            if (err.code === "P2003") {
                throw new NotFoundError("User or event not found.");
            }
        }
        throw err;
        }
    },

    async remove(userId: number, savedEventId: number): Promise<boolean> {
        const { count } = await prisma.savedEvent.deleteMany({
            where: { savedEventId, userId }
        });

        return count > 0;
    }
}