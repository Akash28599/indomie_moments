import { baseApi } from "./baseApi";
import type { AuthUser } from "../../auth/auth.types";
import { ROLE_PERMISSIONS } from "../../auth/permissions";

interface RequestOTPBody {
  phoneNumber: string;
  fullName?: string;
}

interface VerifyOTPBody {
  phoneNumber: string;
  code: string;
}

interface BackendUser {
  id: string;
  phoneNumber: string;
  fullName?: string | null;
  campaignId?: string | null;
  createdAt: string;
  updatedAt: string;
}

function mapBackendUserToAuthUser(user: BackendUser): AuthUser {
  return {
    id: user.id,
    email: user.phoneNumber,
    fullName: user.fullName,
    role: "user",
    permissions: ROLE_PERMISSIONS.user,
  };
}

export const userAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestOtp: builder.mutation<
      { message: string; flow?: "login" | "register" },
      RequestOTPBody
    >({
      query: (body) => ({
        url: "/auth/request-otp",
        method: "POST",
        body,
      }),
      transformResponse: (response: {
        success?: boolean;
        message?: string;
        flow?: "login" | "register";
      }) => ({
        message: response.message ?? "OTP sent.",
        ...(response.flow && { flow: response.flow }),
      }),
    }),

    verifyOtp: builder.mutation<
      { user: AuthUser; message?: string },
      VerifyOTPBody
    >({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
      transformResponse: (response: {
        success?: boolean;
        user?: BackendUser;
        message?: string;
      }) => {
        const user = response.user;
        const message = response.message ?? "Login successful.";
        if (!user) throw new Error(message);
        return { message, user: mapBackendUserToAuthUser(user) };
      },
    }),

    getUserProfile: builder.query<{ user: AuthUser }, void>({
      query: () => "/auth/profile",
      transformResponse: (response: {
        success?: boolean;
        user?: BackendUser;
      }) => {
        const user = response.user;
        if (!user) throw new Error("Not authenticated");
        return { user: mapBackendUserToAuthUser(user) };
      },
    }),

    userLogout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useGetUserProfileQuery,
  useUserLogoutMutation,
} = userAuthApi;
