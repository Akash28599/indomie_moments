import { baseApi, transformResponse } from "./baseApi";
import type {
  MomentListItem,
  MomentBySlug,
  ToggleLikeResult,
  ApiResponse,
  PaginationMeta,
  PaginatedApiResponse,
} from "../../services/types";

export interface ListMomentsArgs {
  currentWeek?: boolean;
  limit?: number;
  offset?: number;
}

export interface ListMomentsResult {
  items: MomentListItem[];
  meta: PaginationMeta;
}

export const momentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listMoments: build.query<ListMomentsResult, ListMomentsArgs | void>({
      query: (arg = {}) => {
        const params = new URLSearchParams();
        if (arg?.currentWeek != null) params.set("currentWeek", String(arg.currentWeek));
        if (arg?.limit != null) params.set("limit", String(arg.limit));
        if (arg?.offset != null) params.set("offset", String(arg.offset));
        const q = params.toString();
        return { url: `/moments${q ? `?${q}` : ""}` };
      },
      transformResponse: (response: PaginatedApiResponse<MomentListItem>) => ({
        items: response.data ?? [],
        meta: response.meta ?? { totalCount: 0, limit: 20, offset: 0 },
      }),
      providesTags: (result) =>
        result?.items
          ? [...result.items.map(({ id }) => ({ type: "Moments" as const, id })), "Moments"]
          : ["Moments"],
    }),
    listMyMoments: build.query<MomentListItem[], void>({
      query: () => ({ url: "/moments/mine" }),
      transformResponse: (response: ApiResponse<MomentListItem[]>) =>
        transformResponse(response),
      providesTags: ["Moments"],
    }),
    getMomentBySlug: build.query<MomentBySlug, string>({
      query: (slug) => ({ url: `/moments/by-slug/${encodeURIComponent(slug)}` }),
      transformResponse: (response: ApiResponse<MomentBySlug>) =>
        transformResponse(response),
      providesTags: (result) =>
        result ? [{ type: "Moments" as const, id: result.id }, "Moments"] : ["Moments"],
    }),
    createMoment: build.mutation<
      { moment: unknown; shareUrl: string },
      FormData
    >({
      query: (body) => ({
        url: "/moments",
        method: "POST",
        body,
        formData: true,
      }),
      transformResponse: (response: ApiResponse<{ moment: unknown; shareUrl: string }>) =>
        transformResponse(response),
    }),
    toggleLike: build.mutation<ToggleLikeResult, string>({
      query: (momentId) => ({
        url: `/moments/${momentId}/like`,
        method: "POST",
      }),
      transformResponse: (response: ApiResponse<ToggleLikeResult>) =>
        transformResponse(response),
      async onQueryStarted(momentId, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          // Update all cached listMoments queries in-place (no refetch, no reorder)
          const state = getState() as { api: { queries: Record<string, { endpointName?: string; originalArgs?: unknown }> } };
          for (const entry of Object.values(state.api.queries)) {
            if (entry?.endpointName === "listMoments") {
              dispatch(
                momentsApi.util.updateQueryData(
                  "listMoments",
                  entry.originalArgs as ListMomentsArgs | void,
                  (draft) => {
                    const moment = draft.items.find((m) => m.id === momentId);
                    if (moment) {
                      moment.likes = data.likes;
                      moment.isLiked = data.isLiked;
                    }
                  }
                )
              );
            }
          }
          // Also update getMomentBySlug cache if this moment is cached
          for (const entry of Object.values(state.api.queries)) {
            if (entry?.endpointName === "getMomentBySlug") {
              dispatch(
                momentsApi.util.updateQueryData(
                  "getMomentBySlug",
                  entry.originalArgs as string,
                  (draft) => {
                    if (draft.id === momentId) {
                      draft.likes = data.likes;
                      draft.isLiked = data.isLiked;
                    }
                  }
                )
              );
            }
          }
        } catch {
          // On failure, invalidate to refetch correct state
          dispatch(momentsApi.util.invalidateTags(["Moments"]));
        }
      },
    }),
  }),
});

export const {
  useListMomentsQuery,
  useListMyMomentsQuery,
  useGetMomentBySlugQuery,
  useCreateMomentMutation,
  useToggleLikeMutation,
} = momentsApi;
