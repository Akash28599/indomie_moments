import { Box, CircularProgress } from '@mui/material';

export function Loading() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="80vh">
      <CircularProgress color="primary" size={40} />
    </Box>
  );
}
