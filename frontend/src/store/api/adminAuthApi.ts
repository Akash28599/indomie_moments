import { baseApi } from "./baseApi";
import type { AuthUser } from "../../auth/auth.types";
import { ROLE_PERMISSIONS } from "../../auth/permissions";

interface AdminLoginBody {
  username: string;
  password: string;
}

interface BackendAdmin {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  lastLogin?: string | null;
}

function mapBackendAdminToAuthUser(admin: BackendAdmin): AuthUser {
  return {
    id: admin.id,
    email: admin.email,
    role: "admin",
    permissions: ROLE_PERMISSIONS.admin,
  };
}

export const adminAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation<
      { admin: AuthUser; message: string },
      AdminLoginBody
    >({
      query: (body) => ({
        url: "/admin/auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: { success?: boolean; admin?: BackendAdmin; message?: string }) => {
        const admin = response.admin;
        const message = response.message ?? "Login successful.";
        if (!admin) throw new Error(message);
        return { message, admin: mapBackendAdminToAuthUser(admin) };
      },
    }),

    getAdminProfile: builder.query<{ admin: AuthUser }, void>({
      query: () => "/admin/auth/profile",
      transformResponse: (response: { success?: boolean; admin?: BackendAdmin }) => {
        const admin = response.admin;
        if (!admin) throw new Error("Not authenticated");
        return { admin: mapBackendAdminToAuthUser(admin) };
      },
    }),

    adminLogout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/admin/auth/logout",
        method: "POST",
      }),
      transformResponse: (response: { success?: boolean; message?: string }) => ({
        message: response.message ?? "Logged out.",
      }),
    }),

    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: "/admin/auth/forgot-password",
        method: "POST",
        body,
      }),
      transformResponse: (response: { success?: boolean; message?: string }) => ({
        message: response.message ?? "If an account exists with that email, a reset link has been sent.",
      }),
    }),

    resetPassword: builder.mutation<{ message: string }, { token: string; password: string }>({
      query: (body) => ({
        url: "/admin/auth/reset-password",
        method: "POST",
        body,
      }),
      transformResponse: (response: { success?: boolean; message?: string }) => ({
        message: response.message ?? "Password reset successfully.",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminLoginMutation,
  useGetAdminProfileQuery,
  useAdminLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = adminAuthApi;
