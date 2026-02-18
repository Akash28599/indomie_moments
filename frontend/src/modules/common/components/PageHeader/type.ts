import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material';

export interface HeaderNavigationLink {
  path: string;
  label: string;
  icon?: ComponentType<SvgIconProps>;
}

export interface HeaderBadge {
  text: string;
  icon?: React.ReactNode;
}

export interface HeaderAuthConfig {
  loginPath: string;
  registerPath: string;
  registerLabel: string;
}

export interface HeaderFeatures {
  showUploadButton?: boolean;
  uploadPath?: string;
  uploadLabel?: string;
  showProfileLink?: boolean;
  profilePath?: string;
}

export interface HeaderConfig {
  theme: 'admin' | 'user';
  navigationLinks: HeaderNavigationLink[];
  authConfig: HeaderAuthConfig;
  features?: HeaderFeatures;
  adminBadge?: HeaderBadge;
}
