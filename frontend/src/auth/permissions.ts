import type { Permission, UserRole } from "./auth.types";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  user: [
    "read:home",
    "read:moments",
    "upload:content",
  ],
  admin: [
    "read:home",
    "read:moments",
    "upload:content",
    "manage:users",
  ],
};
