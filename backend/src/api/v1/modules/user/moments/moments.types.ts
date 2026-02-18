import { z } from "zod";

export const createMomentSchema = z.object({
  caption: z.string().min(1, "Caption is required").max(300),
  consentGiven: z.boolean().refine((v) => v === true, {
    message: "Privacy consent is required",
  }),
});

export const listMomentsQuerySchema = z.object({
  currentWeek: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export const slugParamSchema = z.object({
  slug: z.string().min(1, "Slug is required").max(32),
});

export type CreateMomentInput = z.infer<typeof createMomentSchema>;
export type ListMomentsQuery = z.infer<typeof listMomentsQuerySchema>;

export interface MomentWithUser {
  id: string;
  userId: string;
  userName: string;
  slug: string;
  imageUrl: string;
  caption: string;
  likes: number;
  status: "pending" | "approved" | "rejected";
  shareUrl: string;
  uploadedAt: Date;
}
