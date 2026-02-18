import type { HeaderConfig } from '../type';

export const userHeaderConfig: HeaderConfig = {
  theme: 'user',
  navigationLinks: [
    { path: '/', label: 'Home' },
    { path: '/moments', label: 'Indomie Moments' },
    { path: '/leaderboard', label: 'Leaderboard' },
  ],
  authConfig: {
    loginPath: '/login',
    registerPath: '/register',
    registerLabel: 'Register Now',
  },
  features: {
    showUploadButton: true,
    uploadPath: '/upload',
    uploadLabel: 'Upload Moment',
    showProfileLink: true,
    profilePath: '/profile',
  },
};
