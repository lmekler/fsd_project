import Joi from "joi";

// This is the max int for Postgres - anything higher will be an error
const MAX_INT = 2147483647;

export const savedEventSchemas = {
    getByUser: {
        params: Joi.object({
            userId: Joi.number()
                .integer()
                .positive()
                .max(MAX_INT)
                .required()
                .messages({
                    "any.required": "User ID is required",
                    "number.base": "User ID must be a number",
                    "number.integer": "User ID must be an integer",
                    "number.positive": "User ID must be a positive number",
                    "number.max": "User ID is too large",
                }),
        }).required(),
    },

    add: {
        params: Joi.object({
            userId: Joi.number()
                .integer()
                .positive()
                .max(MAX_INT)
                .required()
                .messages({
                    "any.required": "User ID is required",
                    "number.base": "User ID must be a number",
                    "number.integer": "User ID must be an integer",
                    "number.positive": "User ID must be a positive number",
                    "number.max": "User ID is too large",
                }),
        }).required(),
        body: Joi.object({
            eventId: Joi.number()
                .integer()
                .positive()
                .max(MAX_INT)
                .required()
                .messages({
                    "any.required": "Event ID is required",
                    "number.base": "Event ID must be a number",
                    "number.integer": "Event ID must be an integer",
                    "number.positive": "Event ID must be a positive number",
                    "number.max": "Event ID is too large",
                }),
        }).required(),
    },

    remove: {
        params: Joi.object({
            userId: Joi.number()
                .integer()
                .positive()
                .max(MAX_INT)
                .required()
                .messages({
                    "any.required": "User ID is required",
                    "number.base": "User ID must be a number",
                    "number.integer": "User ID must be an integer",
                    "number.positive": "User ID must be a positive number",
                    "number.max": "User ID is too large",
                }),
            savedEventId: Joi.number()
                .integer()
                .positive()
                .max(MAX_INT)
                .required()
                .messages({
                    "any.required": "Saved Event ID is required",
                    "number.base": "Saved Event ID must be a number",
                    "number.integer": "Saved Event ID must be an integer",
                    "number.positive": "Saved Event ID must be a positive number",
                    "number.max": "Saved Event ID is too large",
                }),
        }).required(),
    },
};