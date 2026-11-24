import type {
    DbSavedEvent,
    DbSavedEventWithDetails
} from "../types/event";
import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../db/prisma";

// Avoids including every user's saved event rows
const eventInclude = {
    organizer: { include: { location: true }},
    location: true,
} as const;

const savedEventWithDetailsInclude = {
    event: { include: eventInclude },
} as const;

export const savedEventsRepository = {
    async getAll(): Promise<DbSavedEvent[]> {
        return prisma.savedEvent.findMany();
    },

    async getAllByUser(userId: number): Promise<DbSavedEvent[]> {
        return prisma.savedEvent.findMany({
            where: { userId }
        });
    },

    async getAllWithDetailsByUser(userId: number): Promise<DbSavedEventWithDetails[]> {
        return prisma.savedEvent.findMany({
            where: { userId },
            include: savedEventWithDetailsInclude
        });
    },

    async getById(savedEventId: number): Promise<DbSavedEvent | null> {
        return prisma.savedEvent.findUnique({
            where: { savedEventId }
        });
    },

    async getWithDetailsById(
        savedEventId: number
    ): Promise<DbSavedEventWithDetails | null> {
        return prisma.savedEvent.findUnique({
            where: { savedEventId },
            include: savedEventWithDetailsInclude
        });
    },

    async getByUserAndEvent(
        userId: number,
        eventId: number
    ): Promise<DbSavedEvent | null> {
        return prisma.savedEvent.findUnique({
            where: { userId_eventId: { userId, eventId }}
        });
    },

    async add(userId: number, eventId: number): Promise<DbSavedEvent> {
        try {
            return await prisma.savedEvent.create({ data: { userId, eventId }});
        } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
        ) {
            const existing = await this.getByUserAndEvent(userId, eventId);
            if (existing) return existing;
        }
        throw err;
        }
    },

    async remove(savedEventId: number): Promise<void> {
        await prisma.savedEvent.deleteMany({ where: { savedEventId } });
    }
}