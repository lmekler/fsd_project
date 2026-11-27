import { z } from "zod";

import { provinces } from "@shared/types/province";

const postalCode = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/, "Postal code must look like A1A 1A1.");

export const locationSchema = z.object({
  venue: z.string().trim().optional(),
  address: z.string().trim().min(1),
  city: z.string().trim().min(1),
  province: z.enum(provinces),
  postalCode: postalCode,
});

export type Location = z.infer<typeof locationSchema>;
