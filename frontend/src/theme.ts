import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#059669' },
    secondary: { main: '#0f172a' },
    background: { default: '#f8fafc', paper: '#ffffff' },
    info: { main: '#0ea5e9' },
    warning: { main: '#f59e0b' },
    error: { main: '#dc2626' },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' },
      },
    },
  },
});
