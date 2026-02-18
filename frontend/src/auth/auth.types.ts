export type UserRole = "user" | "admin";

export type Permission =
  | "read:home"
  | "read:moments"
  | "upload:content"
  | "manage:users";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  fullName?: string | null;
  /** Not used when auth is cookie-based; kept for mock/legacy. */
  token?: string;
}
