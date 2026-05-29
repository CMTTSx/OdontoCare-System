import { Box, Typography } from '@mui/material';

const statusItems = [
  { value: '0', label: 'Atendido', color: '#97ffae' },
  { value: '1', label: 'Cancelado', color: '#fc1703' },
  { value: '2', label: 'Falta', color: '#fcf403' },
];

type StatusSummaryProps = {
  sx?: object;
};

export default function StatusSummary({ sx = {} }: StatusSummaryProps) {
  return (
    <Box
      sx={{
        boxShadow: 5,
        backgroundColor: '#fff',
        width: '60%',
        maxWidth: 900,
        ml: {
          xs: 1,
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
        ...sx,
      }}
    >
      {statusItems.map((item) => (
        <Box
          key={item.label}
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
          <Typography sx={{ color: item.color, fontSize: 26, fontWeight: 600 }}>
            {item.value}
          </Typography>

          <Typography fontWeight={600} color="#000">
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
