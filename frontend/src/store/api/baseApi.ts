import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../../services/types";
import { env } from "../../config/env";
import { toast } from "react-toastify";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.API_BASE_URL,
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  const url = typeof args === "string" ? args : (args as FetchArgs)?.url?.toString() ?? "";

  if (result.error && result.error.status === 401) {
    const isAuthEndpoint =
      url.includes("/auth/request-otp") ||
      url.includes("/auth/verify-otp") ||
      url.includes("/auth/refresh") ||
      url.includes("/admin/auth/login") ||
      url.includes("/admin/auth/register") ||
      url.includes("/admin/auth/refresh");
    if (!isAuthEndpoint) {
      const isAdmin = url.includes("/admin");
      const refreshUrl = isAdmin
        ? `${env.API_BASE_URL}/admin/auth/refresh`
        : `${env.API_BASE_URL}/auth/refresh`;
      const refreshResult = await fetch(refreshUrl, {
        method: "POST",
        credentials: "include",
      });
      if (refreshResult.ok) {
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        window.location.href = isAdmin ? "/admin/login" : "/login";
      }
    }
  }

  if (result.error) {
    if (
      result.error.status === "FETCH_ERROR" ||
      (typeof result.error.status === "number" && result.error.status >= 500)
    ) {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return result;
};

export function transformResponse<T>(response: ApiResponse<T>): T {
  if (response?.success && "data" in response) {
    return response.data as T;
  }
  return response as unknown as T;
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["AdminPendingMoments", "AdminModerationStats", "AdminUserAnalytics", "Moments", "Leaderboard", "Auth"],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: 30,
});
