import { logger } from "../../../../../lib/logger";
import { NotFoundError, BadRequestError } from "../../../abstractions/AppError";
import {
  uploadFileToAzure,
  generateFilename,
  sanitizeFilename,
} from "../uploads/uploads.utils";
import {
  createMomentRepo,
  getMomentBySlugRepo,
  getMomentWithUserBySlugRepo,
  getMomentByIdRepo,
  getMomentLikeCountRepo,
  listApprovedMomentsRepo,
  listUserMomentsRepo,
} from "./moments.repository";
import { generateSlug } from "./moments.utils";
import { getShareUrl } from "../../../utils/shareUrl";

export async function createMomentService(
  userId: string,
  _userName: string,
  file: Express.Multer.File,
  caption: string,
  consentGiven: boolean
) {
  if (!file?.buffer || file.buffer.length === 0) {
    throw new BadRequestError("File is required and must not be empty", { userId });
  }
  if (!consentGiven) {
    throw new BadRequestError("Privacy consent is required", { userId });
  }

  const sanitized = sanitizeFilename(file.originalname || "image.jpg");
  const filename = generateFilename(sanitized);
  const uploadResult = await uploadFileToAzure(file, filename);

  let slug = generateSlug();
  let attempts = 0;
  while (attempts < 5) {
    const existing = await getMomentBySlugRepo(slug);
    if (!existing) break;
    slug = generateSlug();
    attempts++;
  }

  const moment = await createMomentRepo({
    userId,
    slug,
    imageUrl: uploadResult.url,
    caption: caption.trim(),
    consentGiven: true,
    status: "pending",
  });

  logger.info("Moment created", { momentId: moment.id, userId, slug });
  return {
    moment,
    message: "Content will go live within 30 minutes after moderation review.",
    shareUrl: getShareUrl(slug),
  };
}

export async function listMomentsService(options: {
  currentWeek?: boolean;
  limit: number;
  offset: number;
}) {
  const { items, totalCount } = await listApprovedMomentsRepo(options);
  return { items, totalCount };
}

export async function getMomentBySlugService(slug: string) {
  const result = await getMomentWithUserBySlugRepo(slug);
  if (!result) {
    throw new NotFoundError("Moment", { slug });
  }
  const { moment, userName } = result;
  if (moment.status !== "approved") {
    throw new NotFoundError("Moment", { slug });
  }

  const likes = await getMomentLikeCountRepo(moment.id);

  return {
    id: moment.id,
    userId: moment.userId,
    userName,
    slug: moment.slug,
    imageUrl: moment.imageUrl,
    caption: moment.caption,
    likes,
    status: moment.status,
    shareUrl: getShareUrl(moment.slug),
    uploadedAt: moment.createdAt,
  };
}

export async function listMyMomentsService(userId: string) {
  return listUserMomentsRepo(userId);
}

export async function getMomentByIdService(id: string) {
  const moment = await getMomentByIdRepo(id);
  if (!moment) {
    throw new NotFoundError("Moment", { id });
  }
  return moment;
}
