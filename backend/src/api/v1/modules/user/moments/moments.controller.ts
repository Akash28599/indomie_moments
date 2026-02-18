import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../abstractions/AppError";
import {
  createMomentService,
  listMomentsService,
  listMyMomentsService,
  getMomentBySlugService,
} from "./moments.service";
import { createMomentSchema, listMomentsQuerySchema, slugParamSchema } from "./moments.types";
import { getShareUrl } from "../../../utils/shareUrl";
import { getUserLikedMomentIdsRepo } from "../likes/likes.repository";

export async function createMomentController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = req.user;
    if (!user) {
      throw new AppError("Authentication required", 401);
    }

    const file = req.file;
    if (!file) {
      throw new AppError("Image file is required", 400);
    }

    const parsed = createMomentSchema.safeParse({
      caption: req.body?.caption,
      consentGiven: req.body?.consentGiven === "true" || req.body?.consentGiven === true,
    });
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      throw new AppError(firstIssue?.message ?? "Invalid input", 400);
    }

    const { caption, consentGiven } = parsed.data;
    const result = await createMomentService(
      user.id,
      // user name no longer stored in schema; keep param for compatibility
      user.phoneNumber,
      file,
      caption,
      consentGiven
    );

    res.status(201).json({
      success: true,
      message: result.message,
      data: {
        moment: result.moment,
        shareUrl: result.shareUrl,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function listMomentsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const parsed = listMomentsQuerySchema.safeParse(req.query);
    const options = parsed.success
      ? parsed.data
      : { limit: 20, offset: 0, currentWeek: undefined };

    const { items, totalCount } = await listMomentsService(options);

    // If user is logged in, resolve which moments they've liked
    const userId = req.user?.id;
    const likedIds = userId
      ? await getUserLikedMomentIdsRepo(userId, items.map((m) => m.id))
      : new Set<string>();

    res.json({
      success: true,
      data: items.map((m) => ({
        id: m.id,
        userId: m.userId,
        userName: m.userName,
        slug: m.slug,
        imageUrl: m.imageUrl,
        caption: m.caption,
        likes: m.likes,
        isLiked: likedIds.has(m.id),
        status: m.status,
        shareUrl: getShareUrl(m.slug),
        uploadedAt: m.createdAt,
      })),
      meta: {
        totalCount,
        limit: options.limit,
        offset: options.offset,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function listMyMomentsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = req.user;
    if (!user) {
      throw new AppError("Authentication required", 401);
    }

    const moments = await listMyMomentsService(user.id);

    const likedIds = await getUserLikedMomentIdsRepo(user.id, moments.map((m) => m.id));

    res.json({
      success: true,
      data: moments.map((m) => ({
        id: m.id,
        userId: m.userId,
        userName: m.userName,
        slug: m.slug,
        imageUrl: m.imageUrl,
        caption: m.caption,
        likes: m.likes,
        isLiked: likedIds.has(m.id),
        status: m.status,
        shareUrl: getShareUrl(m.slug),
        createdAt: m.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
}

export async function getMomentBySlugController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const parsed = slugParamSchema.safeParse(req.params);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      throw new AppError(first?.message ?? "Invalid slug", 400);
    }
    const moment = await getMomentBySlugService(parsed.data.slug);

    const userId = req.user?.id;
    const likedIds = userId
      ? await getUserLikedMomentIdsRepo(userId, [moment.id])
      : new Set<string>();

    res.json({
      success: true,
      data: {
        ...moment,
        isLiked: likedIds.has(moment.id),
      },
    });
  } catch (error) {
    next(error);
  }
}
