import type { RequestHandler } from "express";
import { z } from "zod";

import { locationSchema } from "./locationValidation";
import { categories, timeOptions } from "../../../../frontend/src/data/dropdown";

const createEventSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required."),
    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters.")
      .optional(),
    category: z.enum(categories).optional(),
    date: z // this will have to be validated further. date must be in the future.
      .string("Date is required.")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD."),
    startTime: z.enum(timeOptions),
    endTime: z.enum(timeOptions).optional(),
    image: z.string().trim(), // will have to look into changing this once I figure out image uploads
    capacity: z.int().nonnegative("Capacity cannot be negative."),
    price: z.number().nonnegative("Price cannot be negative.").default(0),
    tags: z
      .array(z.string().trim())
      .max(10, "An event cannot have more than 10 tags.")
      .default([]),
    location: locationSchema,
  })
  .strict();

export const validateEventBody: RequestHandler = (req, res, next) => {
  const result = createEventSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Invalid event",
      details: z.flattenError(result.error),
    });
    return;
  }

  req.body = result.data;
  next();
};

export const validateEventId: RequestHandler = (req, res, next) => {
  const result = z.coerce.number().int().positive().safeParse(req.params.id);

  if (!result.success) {
    res.status(400).json({
      error: "Invalid event ID",
    });
    return;
  }

  next();
};
