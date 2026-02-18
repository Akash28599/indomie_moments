import { Link as RouterLink } from 'react-router-dom';
import type { AppButtonProps } from './type';
import { variantStyles } from '../../../../style/button.styles';
import{Button,CircularProgress} from '../../../../shared/MUI/index'

export function AppButton({
  label,
  to,
  onClick,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'large',
  fullWidth = false,
  loading = false,
  disabled = false,
}: AppButtonProps) {
  const isIconOnly = iconPosition === 'only';

  return (
    <Button
      component={to ? RouterLink : 'button'}
      to={to}
      onClick={onClick}
      disabled={disabled || loading}
      size={size}
      fullWidth={fullWidth}
      startIcon={
        icon && iconPosition === 'left' && !loading ? icon : undefined
      }
      endIcon={
        icon && iconPosition === 'right' && !loading ? icon : undefined
      }
      sx={{
        px: isIconOnly ? 2 : 4,
        py: 1.6,
        minWidth: isIconOnly ? 48 : undefined,
        borderRadius: '9999px',
        fontWeight: 800,
        fontSize: '1rem',
        textTransform: 'none',
        gap: 1,
        ...variantStyles[variant],
      }}
    >
      {loading ? (
        <CircularProgress size={22} color="inherit" />
      ) : isIconOnly ? (
        icon
      ) : (
        label
      )}
    </Button>
  );
}
