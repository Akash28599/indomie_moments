import type { ReactNode } from "react";

export type UserRole = string;

export interface ScreenConfig {
  id?: string;
  path?: string;
  element: ReactNode;
  roles?: UserRole[];
  isPublic?: boolean;
  isHome?: boolean;
  index?: boolean;
  children?: ScreenConfig[];
}
