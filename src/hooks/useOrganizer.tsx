import { useState, useEffect } from "react";
import type { CreateOrganizer, Organizer } from "../components/types/Organizer";
import { organizerService } from "../services/organizerService";

export function useOrganizer() {
    const [organizers, setOrganizers] = useState<Organizer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        async function loadOrganizers() {
        try {
            const organizers =
                await organizerService.getOrganizers();

            if (!ignore) {
                setOrganizers(organizers);
            }
        } catch {
            if (!ignore) {
                setErrors("Unable to load organizers.");
            }
        } finally {
            if (!ignore) {
                setLoading(false);
            }
        }
        }

        loadOrganizers();

        return () => {
            ignore = true;
        };
    }, []);

    async function addOrganizer(
        input: CreateOrganizer,
    ): Promise<boolean> {
        setErrors(null);

        try {
            const organizer =
                await organizerService.addOrganizer(input);

            setOrganizers((current) => [
                ...current,
                organizer
            ]);

            return true;
        } catch (error) {
            setErrors(
                error instanceof Error
                ? error.message
                : "Unable to add organizer.",
            );

            return false;
        }
    }

    async function removeOrganizer(
        id: string,
    ): Promise<boolean> {
        setErrors(null);

        try {
            await organizerService.removeOrganizer(id);

            setOrganizers((current) =>
                current.filter(
                    (organizer) => organizer.id !== id,
                ),
            );

            return true;
        } catch (error) {
            setErrors(
                error instanceof Error
                ? error.message
                : "Unable to remove organizer.",
            );

            return false;
        }
    }

    return {
        organizers,
        loading,
        errors,
        addOrganizer,
        removeOrganizer
    }
}