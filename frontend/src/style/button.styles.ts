import type { AppButtonVariant } from "../modules/common/components/Button/type";


export const variantStyles: Record<AppButtonVariant, any> = {
  primary: {
    backgroundColor: '#FFD700',
    color: '#111',
    '&:hover': { backgroundColor: '#ffeb3b' },
  },
  secondary: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    border: '2px solid rgba(255,255,255,0.2)',
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#FFD700',
    border: '2px solid #FFD700',
    '&:hover': { backgroundColor: 'rgba(255,215,0,0.1)' },
  },
  danger: {
    backgroundColor: '#E2231A',
    color: '#fff',
    '&:hover': { backgroundColor: '#c41e16' },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#fff',
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
  },
};
