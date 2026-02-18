import { NotFoundError } from "../../../abstractions/AppError";
import { getMomentByIdRepo } from "../../../common/repositories/moments.repository";
import {
  listPendingMomentsRepo,
  updateMomentStatusRepo,
  getModerationStatsRepo,
} from "./admin-moments.repository";
import { getShareUrl } from "../../../utils/shareUrl";

export async function listPendingMomentsService() {
  const rows = await listPendingMomentsRepo();
  return rows.map((m) => ({
    id: m.id,
    userId: m.userId,
    userName: m.userName,
    slug: m.slug,
    imageUrl: m.imageUrl,
    caption: m.caption,
    status: m.status,
    createdAt: m.createdAt,
    shareUrl: getShareUrl(m.slug),
  }));
}

export async function updateMomentStatusService(
  momentId: string,
  status: "approved" | "rejected"
) {
  const moment = await getMomentByIdRepo(momentId);
  if (!moment) {
    throw new NotFoundError("Moment", { momentId });
  }
  return updateMomentStatusRepo(momentId, status);
}

export async function getModerationStatsService() {
  return getModerationStatsRepo();
}
