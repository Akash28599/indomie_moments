# Common Header Component

A flexible, reusable header component that can be configured with props for different use cases (user header, admin header, etc.).

## Features

- 🎨 Fully customizable navigation links with optional icons
- 🔐 Built-in authentication support
- 📱 Responsive mobile menu
- 🎯 Active route highlighting
- 🛡️ Optional admin badge
- ⚡ MUI icons support
- 🎭 Custom action buttons support

## Basic Usage

```tsx
import { Header } from './Header';

<Header
  navigationLinks={[
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
  ]}
  isAuthenticated={true}
  user={{ name: 'John Doe' }}
  onLogout={() => console.log('Logged out')}
/>
```

## Props

### Navigation Props

#### `navigationLinks?: NavigationLink[]`
Array of navigation links to display in the header.

```tsx
navigationLinks={[
  { path: '/', label: 'Home' },
  { path: '/moments', label: 'Indomie Moments' },
  { path: '/admin', label: 'Admin', icon: HomeIcon }, // With icon
]}
```

### Authentication Props

#### `isAuthenticated?: boolean`
Whether the user is authenticated. Default: `false`

#### `user?: { name?: string; [key: string]: any }`
User object containing at least a name property.

#### `onLogout?: () => void`
Callback function when logout button is clicked.

### Auth Route Props

#### `loginPath?: string`
Path to login page. Default: `'/login'`

#### `registerPath?: string`
Path to register page. Default: `'/register'`

#### `registerLabel?: string`
Label for register button. Default: `'Register Now'`

### Feature Props

#### `showUploadButton?: boolean`
Show upload moment button when authenticated. Default: `false`

#### `uploadPath?: string`
Path for upload button. Default: `'/upload'`

#### `uploadLabel?: string`
Label for upload button. Default: `'Upload Moment'`

#### `showProfileLink?: boolean`
Show profile link with user icon. Default: `false`

#### `profilePath?: string`
Path to profile page. Default: `'/profile'`

### Admin Badge Props

#### `showAdminBadge?: boolean`
Show admin badge next to logo. Default: `false`

#### `adminBadgeIcon?: ReactNode`
Icon to display in admin badge.

```tsx
adminBadgeIcon={<ShieldIcon sx={{ fontSize: 16 }} />}
```

#### `adminBadgeText?: string`
Text to display in admin badge. Default: `'Admin'`

### Custom Actions Props

#### `customActions?: ReactNode`
Custom actions to render in desktop navigation (replaces default auth actions).

```tsx
customActions={
  <div className="flex gap-4">
    <button>Custom Button 1</button>
    <button>Custom Button 2</button>
  </div>
}
```

#### `customMobileActions?: ReactNode`
Custom actions for mobile menu (replaces default mobile auth actions).

## Examples

### User Header

```tsx
import { Header } from './Header';
import { useAuth } from '@/app/context/AuthContext';

export const UserHeader = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <Header
      navigationLinks={[
        { path: '/', label: 'Home' },
        { path: '/moments', label: 'Indomie Moments' },
        { path: '/leaderboard', label: 'Leaderboard' },
      ]}
      isAuthenticated={isAuthenticated}
      user={user}
      onLogout={logout}
      showUploadButton={true}
      showProfileLink={true}
    />
  );
};
```

### Admin Header

```tsx
import HomeIcon from '@mui/icons-material/Home';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ShieldIcon from '@mui/icons-material/Shield';
import { Header } from './Header';
import { useAuth } from '@/app/context/AuthContext';
import { useNavigate } from 'react-router';

export const AdminHeader = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Header
      navigationLinks={[
        { path: '/admin', label: 'Home', icon: HomeIcon },
        { path: '/admin/approvals', label: 'Approvals', icon: AssignmentTurnedInIcon },
      ]}
      isAuthenticated={isAuthenticated && user?.isAdmin}
      user={user}
      onLogout={() => {
        logout();
        navigate('/admin/login');
      }}
      loginPath="/admin/login"
      registerPath="/admin/register"
      showAdminBadge={true}
      adminBadgeIcon={<ShieldIcon sx={{ fontSize: 16 }} />}
    />
  );
};
```

### Simple Public Header (No Auth)

```tsx
<Header
  navigationLinks={[
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]}
/>
```

### Custom Actions Example

```tsx
<Header
  navigationLinks={[
    { path: '/', label: 'Home' },
  ]}
  customActions={
    <div className="flex items-center gap-4">
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Custom Action
      </button>
      <select className="px-4 py-2 border rounded">
        <option>Language</option>
        <option>EN</option>
        <option>ID</option>
      </select>
    </div>
  }
/>
```

## Styling

The header uses Tailwind CSS classes and can be customized by:
- Modifying the component directly
- Using the color scheme: `#E2231A` (red) and `#FFD700` (yellow)
- The header is sticky by default with `sticky top-0 z-50`

## Navigation Links with Icons

When using icons with navigation links, import MUI icons:

```tsx
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const links = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/about', label: 'About', icon: InfoIcon },
  { path: '/contact', label: 'Contact', icon: ContactMailIcon },
];
```

## TypeScript Types

```typescript
interface NavigationLink {
  path: string;
  label: string;
  icon?: ComponentType<SvgIconProps>;
}

interface HeaderProps {
  navigationLinks?: NavigationLink[];
  isAuthenticated?: boolean;
  user?: { name?: string; [key: string]: any };
  onLogout?: () => void;
  loginPath?: string;
  registerPath?: string;
  registerLabel?: string;
  showUploadButton?: boolean;
  uploadPath?: string;
  uploadLabel?: string;
  showProfileLink?: boolean;
  profilePath?: string;
  showAdminBadge?: boolean;
  adminBadgeIcon?: ReactNode;
  adminBadgeText?: string;
  customActions?: ReactNode;
  customMobileActions?: ReactNode;
}
```
