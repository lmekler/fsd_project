import type { SavedEventWithDetails } from "@shared/types/Event";
import { BASE_URL, readJson } from "./apiHandler";

export const savedEventsRepo = {
    async getByUser(userId: number): Promise<SavedEventWithDetails[]> {
        const res: Response = await fetch(`${BASE_URL}/saved-events/${userId}`);

        return readJson<SavedEventWithDetails[]>(res);
    },

    async add(
        userId: number,
        eventId: number
    ): Promise<SavedEventWithDetails> {
        const res: Response = await fetch(`${BASE_URL}/saved-events/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventId })
        });

        return readJson<SavedEventWithDetails>(res);
    },

    async remove(
        userId: number,
        savedEventId: number
    ): Promise<void> {
        const res: Response = await fetch(`${BASE_URL}/saved-events/${userId}/${savedEventId}`, {
            method: "DELETE"
        });

        // Since 204 code is NO-CONTENT, we'll parse only when it fails
        if (!res.ok) {
            await readJson<never>(res);
        }
    }
}