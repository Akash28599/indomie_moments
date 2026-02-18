import HomeIcon from '@mui/icons-material/Home';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PeopleIcon from '@mui/icons-material/People';
import ShieldIcon from '@mui/icons-material/Shield';
import type { HeaderConfig } from '../type';

export const adminHeaderConfig: HeaderConfig = {
  theme: 'admin',
  navigationLinks: [
    { path: '/admin', label: 'Home', icon: HomeIcon },
    { path: '/admin/approvals', label: 'Approvals', icon: AssignmentTurnedInIcon },
    { path: '/admin/users', label: 'Users', icon: PeopleIcon },
  ],
  authConfig: {
    loginPath: '/admin/login',
    registerPath: '/admin/register',
    registerLabel: 'Register',
  },
  adminBadge: {
    text: 'Admin',
    icon: <ShieldIcon sx={{ fontSize: 16 }} />,
  },
};
