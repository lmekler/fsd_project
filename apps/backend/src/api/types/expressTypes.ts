import { Request, Response, NextFunction } from "express";

/**
 * Middleware Function structure
 */
export type MiddlewareFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;