import { Box, Typography } from '@mui/material';

export default function DemoNotice() {
  return (
    <Box
      sx={{
        mt: 2,
        mb: 1,
        px: 2,
        py: 1,
        borderRadius: 1,
        border: '1px solid #fecaca',
        backgroundColor: '#fff1f2',
      }}
    >
      <Typography
        sx={{
          color: '#dc2626',
          fontWeight: 700,
          fontSize: 13,
          textAlign: 'center',
          letterSpacing: 0.2,
        }}
      >
        Versão demonstrativa
      </Typography>
    </Box>
  );
}
