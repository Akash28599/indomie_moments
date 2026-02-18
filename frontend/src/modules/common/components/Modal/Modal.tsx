import MuiDialog from '@mui/material/Dialog';
import type { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export interface ModalProps extends Omit<MuiDialogProps, 'title'> {
  title?: string;
  actions?: React.ReactNode;
}

export function Modal({ title, actions, children, ...rest }: ModalProps) {
  return (
    <MuiDialog maxWidth="sm" fullWidth {...rest}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </MuiDialog>
  );
}
