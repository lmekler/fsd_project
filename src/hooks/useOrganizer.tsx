import { useState, useEffect } from "react";
import type { Organizer } from "../components/types/Organizer";
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

    return {
        organizers,
        loading,
        errors
    }
}