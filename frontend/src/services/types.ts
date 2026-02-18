/**
 * API response types matching backend payloads (success: true, data: T)
 */

export interface MomentListItem {
  id: string;
  userId: string;
  userName: string;
  slug: string;
  imageUrl: string;
  caption: string;
  likes: number;
  isLiked: boolean;
  status: "pending" | "approved" | "rejected";
  shareUrl: string;
  uploadedAt: string;
  fullName:string;
}

export interface MomentBySlug extends MomentListItem {}

export interface LeaderboardItem {
  id: string;
  userId: string;
  userName: string;
  slug: string;
  imageUrl: string;
  caption: string;
  likes: number;
  shareUrl: string;
  uploadedAt: string;
}

export interface WeeklyWinnerItem {
  id: string;
  userId: string;
  userName: string;
  slug: string;
  imageUrl: string;
  likes: number;
  shareUrl: string;
}

export interface PendingMomentItem {
  id: string;
  userId: string;
  userName: string;
  slug: string;
  imageUrl: string;
  caption: string;
  status: "pending";
  createdAt: string;
}

export interface ModerationStats {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalCampaigns: number;
  activeCampaigns: number;
}

export interface ToggleLikeResult {
  likes: number;
  isLiked: boolean;
}

export interface PaginationMeta {
  totalCount: number;
  limit: number;
  offset: number;
}

export interface MomentsListResponse {
  items: MomentListItem[];
  meta: PaginationMeta;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface PaginatedApiResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

export interface UserAnalyticsItem {
  id: string;
  fullName: string | null;
  phoneNumber: string;
  campaignName: string | null;
  totalPosts: number;
  approvedPosts: number;
  pendingPosts: number;
  totalLikes: number;
  registeredAt: string;
}

export interface UserAnalyticsResponse {
  users: UserAnalyticsItem[];
  total: number;
  totalPages: number;
  currentPage: number;
}
