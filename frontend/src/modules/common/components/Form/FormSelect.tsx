import { TextField } from '../TextField';
import type { TextFieldProps } from '@mui/material/TextField';

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps extends Omit<TextFieldProps, 'select'> {
  options: FormSelectOption[];
}

export function FormSelect({ options, ...props }: FormSelectProps) {
  return (
    <TextField select SelectProps={{ native: true }} {...props}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </TextField>
  );
}
