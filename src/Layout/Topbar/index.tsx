import { Box, Typography } from '@mui/material';

export default function TopBar() {
  return (
    <Box
      sx={{
        boxShadow: 5,
        backgroundColor: '#fff',
        mt: 4,
        width: '60%',
        maxWidth: 900,

        /* ajuste fino no 320px */
        ml: {
          xs: 1,     // afasta um pouco da esquerda (8px)
          sm: 'auto',
        },
        mr: 'auto',

        px: {
          xs: 1.5,
          sm: 3,
        },
        py: 2,

        boxSizing: 'border-box',
        borderRadius: 2,

        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',

        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        gap: {
          xs: 2,
          sm: 0,
        },
      }}
    >
      <StatusItem value="0" label="Atendido" color="#97ffae" />
      <StatusItem value="1" label="Cancelado" color="#fc1703" />
      <StatusItem value="2" label="Falta" color="#fcf403" />
    </Box>
  );
}

// ================= ITEM =================
function StatusItem({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        width: {
          xs: '100%',
          sm: 'auto',
        },
        minWidth: {
          xs: 0,
          sm: 120,
        },
      }}
    >
      <Typography sx={{ color, fontSize: 26, fontWeight: 600 }}>
        {value}
      </Typography>

      <Typography fontWeight={600} color="#000">
        {label}
      </Typography>
    </Box>
  );
}
