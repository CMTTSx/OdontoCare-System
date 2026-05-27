import { Box, Typography } from '@mui/material';
import AtendimentoPopover from '../AtendimentoPopover';

export default function DummyBar() {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: '#dbdbdb',
        borderLeft: 5,
        borderLeftColor: '#5465FF',
        boxShadow: 2,
        mb: 1,
        backgroundColor: '#fff',

        px: 2,
        py: 1,

        // mesma largura do ServiceBar de referência
        width: {
          xs: '100%',   
          sm: '100%',
          md: '100%',
          lg: '100%',
        },

        // alinhado à esquerda (remove centralização)
        mx: 0,

        boxSizing: 'border-box',

        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: '2fr 1.5fr 1fr auto',
        },
        alignItems: 'center',
        gap: {
          xs: 0.5,
          md: 1,
        },
      }}
    >
      {/* ================= Nome + Idade ================= */}
      <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography
          fontWeight={600}
          fontSize={{ xs: 13, sm: 14 }}
          lineHeight={1.2}
        >
          Abílio Diniz Jorge
        </Typography>

        <Typography
          fontSize={{ xs: 12, sm: 13 }}
          lineHeight={1.2}
        >
          60 Anos e 7 Meses
        </Typography>
      </Box>

      {/* ================= Data / Hora ================= */}
      <Typography
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          fontSize: { xs: 12, sm: 13 },
          lineHeight: 1.2,
        }}
      >
        22/12/2022 11:00
      </Typography>

      {/* ================= Status ================= */}
      <Typography
        sx={{
          color: '#5465FF',
          fontWeight: 600,
          fontSize: { xs: 12, sm: 13 },
          lineHeight: 1.2,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        Agendado
      </Typography>

      {/* ================= Popover ================= */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: {
            xs: 'center',
            md: 'flex-end',
          },
        }}
      >
        <AtendimentoPopover />
      </Box>
    </Box>
  );
}
