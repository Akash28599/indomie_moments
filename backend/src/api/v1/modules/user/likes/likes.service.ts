import { BadRequestError, NotFoundError } from "../../../abstractions/AppError";
import { getMomentByIdRepo } from "../moments/moments.repository";
import {
  hasUserLikedRepo,
  addLikeRepo,
  removeLikeRepo,
  getLikeCountRepo,
} from "./likes.repository";

export async function toggleLikeService(
  momentId: string,
  userId: string
): Promise<{ likes: number; isLiked: boolean }> {
  const moment = await getMomentByIdRepo(momentId);
  if (!moment) {
    throw new NotFoundError("Moment", { momentId });
  }
  if (moment.status !== "approved") {
    throw new BadRequestError("Cannot like a moment that is not approved", {
      momentId,
      status: moment.status,
    });
  }

  const alreadyLiked = await hasUserLikedRepo(momentId, userId);

  if (alreadyLiked) {
    await removeLikeRepo(momentId, userId);
    const likes = await getLikeCountRepo(momentId);
    return { likes, isLiked: false };
  } else {
    await addLikeRepo(momentId, userId);
    const likes = await getLikeCountRepo(momentId);
    return { likes, isLiked: true };
  }
}
