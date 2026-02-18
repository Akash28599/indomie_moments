import { baseApi, transformResponse } from "./baseApi";
import type { LeaderboardItem, ApiResponse } from "../../services/types";

export interface LeaderboardArgs {
  limit?: number;
  offset?: number;
}

export const leaderboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Current week leaderboard
    getLeaderboard: build.query<LeaderboardItem[], LeaderboardArgs | void>({
      query: (arg = {}) => {
        const params = new URLSearchParams();
        if (arg?.limit != null) params.set("limit", String(arg.limit));
        if (arg?.offset != null) params.set("offset", String(arg.offset));
        const q = params.toString();

        return { url: `/leaderboard${q ? `?${q}` : ""}` };
      },
      transformResponse: (response: ApiResponse<LeaderboardItem[]>) =>
        transformResponse(response),
    }),

    // Previous week winners (from leaderboard table)
    getWeeklyWinners: build.query<LeaderboardItem[], void>({
      query: () => ({ url: "/leaderboard/weekly-winners" }),
      transformResponse: (response: ApiResponse<LeaderboardItem[]>) =>
        transformResponse(response),
    }),

    // Optional top5 endpoint
    getTop5: build.query<LeaderboardItem[], void>({
      query: () => ({ url: "/leaderboard/top5" }),
      transformResponse: (response: ApiResponse<LeaderboardItem[]>) =>
        transformResponse(response),
    }),
  }),
});

export const {
  useGetLeaderboardQuery,
  useGetWeeklyWinnersQuery,
  useGetTop5Query,
} = leaderboardApi;
