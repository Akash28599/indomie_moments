import { baseApi, transformResponse } from "./baseApi";
import type {
  PendingMomentItem,
  ModerationStats,
  MomentListItem,
  ApiResponse,
} from "../../services/types";

export interface UpdateMomentStatusArg {
  id: string;
  status: "approved" | "rejected";
}

export const adminMomentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPendingMoments: build.query<PendingMomentItem[], void>({
      query: () => ({ url: "/admin/moments/pending" }),
      transformResponse: (response: ApiResponse<PendingMomentItem[]>) =>
        transformResponse(response),
      providesTags: ["AdminPendingMoments"],
    }),
    getModerationStats: build.query<ModerationStats, void>({
      query: () => ({ url: "/admin/moments/stats" }),
      transformResponse: (response: ApiResponse<ModerationStats>) =>
        transformResponse(response),
      providesTags: ["AdminModerationStats"],
    }),
    updateMomentStatus: build.mutation<
      MomentListItem,
      UpdateMomentStatusArg
    >({
      query: ({ id, status }) => ({
        url: `/admin/moments/${id}`,
        method: "PATCH",
        body: { status },
      }),
      transformResponse: (response: ApiResponse<MomentListItem>) =>
        transformResponse(response),
      invalidatesTags: ["AdminPendingMoments", "AdminModerationStats"],
    }),
  }),
});

export const {
  useGetPendingMomentsQuery,
  useGetModerationStatsQuery,
  useUpdateMomentStatusMutation,
} = adminMomentsApi;
