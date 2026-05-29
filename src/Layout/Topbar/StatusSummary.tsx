import { Box, Typography } from '@mui/material';
type StatusSummaryProps = {
  atendidos: number;
  cancelados: number;
  faltas: number;
  sx?: object;
};

const statusItems = [
  { key: 'atendidos', label: 'Atendido', color: '#97ffae' },
  { key: 'cancelados', label: 'Cancelado', color: '#fc1703' },
  { key: 'faltas', label: 'Falta', color: '#fcf403' },
] as const;

export default function StatusSummary({
  atendidos,
  cancelados,
  faltas,
  sx = {},
}: StatusSummaryProps) {
  const values = {
    atendidos,
    cancelados,
    faltas,
  } satisfies Record<(typeof statusItems)[number]['key'], number>;

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
            {values[item.key]}
          </Typography>

          <Typography fontWeight={600} color="#000">
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
