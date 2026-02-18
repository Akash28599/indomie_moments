import { env } from "../../../config/env";

export const API_ENDPOINTS = {
  BASE: env.API_BASE_URL,
  AUTH: {
    REQUEST_OTP: `${env.API_BASE_URL}/auth/request-otp`,
    VERIFY_OTP: `${env.API_BASE_URL}/auth/verify-otp`,
    PROFILE: `${env.API_BASE_URL}/auth/profile`,
    LOGOUT: `${env.API_BASE_URL}/auth/logout`,
  },
  MOMENTS: {
    LIST: `${env.API_BASE_URL}/moments`,
    BY_SLUG: (slug: string) => `${env.API_BASE_URL}/moments/by-slug/${slug}`,
    UPLOAD: `${env.API_BASE_URL}/moments`,
    LIKE: (id: string) => `${env.API_BASE_URL}/moments/${id}/like`,
  },
  LEADERBOARD: {
    LIST: `${env.API_BASE_URL}/leaderboard`,
    WEEKLY_WINNERS: `${env.API_BASE_URL}/leaderboard/weekly-winners`,
  },
  ADMIN: {
    LOGIN: `${env.API_BASE_URL}/admin/auth/login`,
    LOGOUT: `${env.API_BASE_URL}/admin/auth/logout`,
    PROFILE: `${env.API_BASE_URL}/admin/auth/profile`,
    DASHBOARD_STATS: `${env.API_BASE_URL}/admin/dashboard/stats`,
    CAMPAIGNS: `${env.API_BASE_URL}/admin/campaigns`,
    CAMPAIGN_ID: (id: string) => `${env.API_BASE_URL}/admin/campaigns/${id}`,
    USERS: `${env.API_BASE_URL}/admin/users`,
    USERS_EXPORT: `${env.API_BASE_URL}/admin/users/export`,
    MOMENTS_PENDING: `${env.API_BASE_URL}/admin/moments/pending`,
    MOMENTS_STATS: `${env.API_BASE_URL}/admin/moments/stats`,
    MOMENT_UPDATE: (id: string) => `${env.API_BASE_URL}/admin/moments/${id}`,
  },
};
