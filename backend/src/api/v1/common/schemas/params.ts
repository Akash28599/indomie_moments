import { z } from "zod";

/** Reusable UUID param schema for route params (e.g. :id) */
export const uuidParamSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});

export type UuidParam = z.infer<typeof uuidParamSchema>;
