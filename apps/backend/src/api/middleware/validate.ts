import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { MiddlewareFunction } from "../types/expressTypes";
import { ValidationError } from "../errors/errors";

interface RequestSchema {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema
}

interface ValidationOptions {
    stripBody?: boolean;
    stripQuery?: boolean;
    stripParams?: boolean
}

// Middleware added to the request cycle
/**
 * Express middleware function validation parts of the request against
 * Joi schemas and stripping unknown fields appropriately
 * @param schemas - Object containing schemas for body, params, queries
 * @param options - Validation options stripping value
 * @returns Express middleware function that performs validation
 */
export const validateRequest = (
    schemas: RequestSchema,
    options: ValidationOptions = {}
): MiddlewareFunction => {

    const defaultOptions = {
        stripBody: true,
        stripQuery: true,
        stripParams: false,
        ...options
    }

    return (req: Request, _res: Response, next: NextFunction) => {

        try {

            const errors: string[] = [];

            /**
             * Validates the specific part of the request (body, params, or query)
             * against a Joi schema.
             * 
             * Collects validation errors and optionally strips unknown fields from 
             * the data.
             * @param schema - Joi schema to validate against
             * @param data - The request data to validate (req.body, req.params, or req.query)
             * @param partName - Name of the request part for error prefixing (e.g. "Body", "Params", "Query")
             * @param shouldStrip - Whether to strip unknown fields from the validated data
             * @returns The original data if validation fails or stripping is disabled, otherwise,
             * the stripped/validated data
             */
            const validatePart = (
                schema: ObjectSchema,
                data: any,
                _partName: string,
                shouldStrip: boolean
            ) => {

                const { error, value } = schema.validate(data, {
                    abortEarly: false,
                    stripUnknown: shouldStrip
                });

                if (error) {
                    errors.push(
                        ...error.details.map(detail => {
                            return `${detail.message}`
                        })
                    );
                } else if (shouldStrip) {
                    return value;
                } else {
                    return data;
                }
            }

            // Validate each part if schema is provided

            if (schemas.body) {
                req.body = validatePart(
                    schemas.body,
                    req.body,
                    "Body",
                    defaultOptions.stripBody
                );
            }

            if (schemas.params) {
                req.params = validatePart(
                    schemas.params,
                    req.params,
                    "Params",
                    defaultOptions.stripParams
                );
            }

            if (schemas.query) {
                req.query = validatePart(
                    schemas.query,
                    req.query,
                    "Query",
                    defaultOptions.stripQuery
                );
            }

            // Hand validation errors to the central error handler
            if (errors.length > 0) {
                return next(new ValidationError(`Validation error: ${errors.join(", ")}`));
            }

            next();
        } catch (error: unknown) {
            next(error);
        }
    };
}