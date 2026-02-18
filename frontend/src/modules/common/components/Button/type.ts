import type { ReactNode } from 'react';
import type { ButtonProps } from '../../../../shared/MUI/index';

export type AppButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'danger'
  | 'ghost';

export type IconPosition = 'left' | 'right' | 'only';

export interface AppButtonProps {
  label?: string;
  to?: string;
  onClick?: () => void;

  icon?: ReactNode;
  iconPosition?: IconPosition;

  variant?: AppButtonVariant;
  size?: ButtonProps['size'];
  fullWidth?: boolean;

  loading?: boolean;
  disabled?: boolean;
}
