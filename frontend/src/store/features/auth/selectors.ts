import type { RootState } from "../../store";
import type { AuthUser } from "../../../auth/auth.types";

export const selectUser = (state: RootState): AuthUser | null => state.auth.user;
export const selectAdmin = (state: RootState): AuthUser | null => state.auth.admin;

export const selectActiveUser = (state: RootState): AuthUser | null =>
  state.auth.user ?? state.auth.admin ?? null;

export const selectIsAuthenticated = (state: RootState): boolean =>
  Boolean(state.auth.user ?? state.auth.admin);

export const selectUserRole = (state: RootState): AuthUser["role"] | null =>
  selectActiveUser(state)?.role ?? null;
