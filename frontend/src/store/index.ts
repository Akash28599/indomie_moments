export { store, persistor } from "./store";
export type { RootState, AppDispatch } from "./store";
export { useAppDispatch, useAppSelector } from "./hooks";

export { setUser, setAdmin, clearUser, clearAdmin } from "./features/auth/slice";
export {
  verifyUserOtpThunk,
  loginAdminThunk,
  logoutUserThunk,
  logoutAdminThunk,
} from "./features/auth/thunks";
export {
  selectUser,
  selectAdmin,
  selectActiveUser,
  selectIsAuthenticated,
  selectUserRole,
} from "./features/auth/selectors";

export { baseApi, transformResponse } from "./api/baseApi";
export { userAuthApi } from "./api/userAuthApi";
export { adminAuthApi } from "./api/adminAuthApi";
export { momentsApi } from "./api/momentsApi";
export { leaderboardApi } from "./api/leaderboardApi";
export { adminMomentsApi } from "./api/adminMomentsApi";
export { adminUsersApi } from "./api/adminUsersApi";

// Re-export RTK Query hooks
export {
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useGetUserProfileQuery,
  useUserLogoutMutation,
} from "./api/userAuthApi";
export {
  useAdminLoginMutation,
  useGetAdminProfileQuery,
  useAdminLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "./api/adminAuthApi";
export {
  useListMomentsQuery,
  useListMyMomentsQuery,
  useGetMomentBySlugQuery,
  useCreateMomentMutation,
  useToggleLikeMutation,
} from "./api/momentsApi";
export {
  useGetLeaderboardQuery,
  useGetWeeklyWinnersQuery,
} from "./api/leaderboardApi";
export {
  useGetPendingMomentsQuery,
  useGetModerationStatsQuery,
  useUpdateMomentStatusMutation,
} from "./api/adminMomentsApi";
export {
  useGetUserAnalyticsQuery,
} from "./api/adminUsersApi";
