import { TextField } from '../TextField';
import type { TextFieldProps } from '@mui/material/TextField';

export type FormTextFieldProps = TextFieldProps;

export function FormTextField(props: FormTextFieldProps) {
  return <TextField {...props} />;
}
