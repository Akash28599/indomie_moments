import { z } from "zod";
import { uuidParamSchema } from "../../../common/schemas";

export const updateMomentStatusSchema = z.object({
  status: z.enum(["approved", "rejected"]),
});

export const momentIdParamSchema = uuidParamSchema;
export type UpdateMomentStatusInput = z.infer<typeof updateMomentStatusSchema>;
