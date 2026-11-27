import type { RequestHandler } from "express";
import { z } from "zod";
import { provinces } from "@shared/types/province"

const organizerSchema = z
  .object({
    name: z.string("Name is required.").trim().min(3, "Name must be at least 3 characters long."),
    description: z
      .string("Description is required.")
      .trim()
      .max(300, "Description cannot exceed 300 characters."),
    website: z 
      .string("Website is required.")
      .regex(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/, "Website must be in a valid format."),
    phone: z
      .string("Phone number is required.")
      .regex(/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Phone number must be in a valid format"),
    email: z
      .string()
      .optional(),
    image: z.string().trim(),
    location: z.object({
        venue: z.string().trim().optional(),
        address: z.string().trim().nonempty(),
        city: z.string().trim().nonempty(),
        province: z.enum(provinces),
        postalCode: z.string()
            .trim()
            .toUpperCase()
            .regex(/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/, "Postal code must be in valid format."),
    })
  })
  .strict();

export const validateOrganizer: RequestHandler = (req, res, next) => {
  const result = organizerSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Invalid organizer",
      details: z.flattenError(result.error),
    });
    return;
  }

  req.body = result.data;
  next();
};

export const validateOrganizerId: RequestHandler = (req, res, next) => {
  const result = z.coerce.number().int().positive().safeParse(req.params.id);

  if (!result.success) {
    res.status(400).json({
      error: "Invalid organizer ID",
    });
    return;
  }

  next();
};
