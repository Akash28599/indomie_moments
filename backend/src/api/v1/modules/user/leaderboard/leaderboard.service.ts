import { getShareUrl } from "../../../utils/shareUrl";
import {
  getLeaderboardRepo,
  getTop5FromLeaderboardRepo,
} from "./leaderboard.repository";

// 🔥 Current week leaderboard (live from moments)
export async function getLeaderboardService(options: {
  limit: number;
  offset: number;
}) {
  const items = await getLeaderboardRepo({
    limit: options.limit,
    offset: options.offset,
  });

  return items.map((m) => ({
    id: m.id,
    userId: m.userId,
    userName: m.userName,
    slug: m.slug,
    imageUrl: m.imageUrl,
    caption: m.caption,
    likes: m.likes,
    shareUrl: getShareUrl(m.slug),
    uploadedAt: m.createdAt,
  }));
}

// 🔥 Previous week winners (from leaderboard table)
export async function getWeeklyWinnersService() {
  const items = await getTop5FromLeaderboardRepo();

  return items.slice(0, 3).map((m) => ({
    id: m.momentId,
    userId: m.userId,
    userName: m.userName,
    slug: m.slug,
    imageUrl: m.imageUrl,
    caption: m.caption,
    likes: m.likeCount,
    shareUrl: getShareUrl(m.slug),
  }));
}

// 🔥 Full previous week top 5
export async function getTop5Service() {
  const items = await getTop5FromLeaderboardRepo();

  return items.map((m) => ({
    id: m.momentId,
    userId: m.userId,
    userName: m.userName,
    slug: m.slug,
    imageUrl: m.imageUrl,
    caption: m.caption,
    likes: m.likeCount,
    shareUrl: getShareUrl(m.slug),
  }));
}
