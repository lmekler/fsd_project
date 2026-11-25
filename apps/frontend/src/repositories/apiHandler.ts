// Handles responses from backend
export const BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export class ApiError extends Error {
    status: number;
    constructor (message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

export async function readJson<T>(
    response: Response
): Promise<T> {
    const json = await response.json().catch(() => null);

    if (!response.ok) {
        const message = json?.error?.message ?? json?.message ?? `API Error: ${response.status}`;
        throw new ApiError(message, response.status);
    }

    return (json as { message: string; data: T}).data;
}