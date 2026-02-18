import { baseApi, transformResponse } from "./baseApi";
import type { UserAnalyticsResponse, ApiResponse } from "../../services/types";

export interface UserAnalyticsArgs {
  page: number;
  limit: number;
  search?: string;
}

export const adminUsersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserAnalytics: build.query<UserAnalyticsResponse, UserAnalyticsArgs>({
      query: ({ page, limit, search }) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) params.set("search", search);
        return { url: `/admin/users/analytics?${params.toString()}` };
      },
      transformResponse: (response: ApiResponse<UserAnalyticsResponse>) =>
        transformResponse(response),
      providesTags: ["AdminUserAnalytics"],
    }),
  }),
});

export const { useGetUserAnalyticsQuery } = adminUsersApi;
