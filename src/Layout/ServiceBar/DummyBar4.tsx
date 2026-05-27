import { Box, Typography } from '@mui/material';

export default function DummyBar4() {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: '#dbdbdb',
        borderLeft: 5,
        borderLeftColor: '#FF3562',
        boxShadow: 2,
        mb: 1,
        backgroundColor: '#fff',

        px: 2,
        py: 1,

        // mesmo padrão validado
        width: {
          xs: '100%',   
          sm: '100%',
          md: '100%',
          lg: '100%',
        },

        // alinhado à esquerda
        mx: 0,

        boxSizing: 'border-box',

        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',                 // mobile empilhado
          md: '2fr 1.5fr 1fr',       // desktop compacto
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
          Solange Alves Reis
        </Typography>

        <Typography
          fontSize={{ xs: 12, sm: 13 }}
          lineHeight={1.2}
        >
          48 Anos e 3 Meses
        </Typography>
      </Box>

      {/* ================= Data ================= */}
      <Typography
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          fontSize: { xs: 12, sm: 13 },
          lineHeight: 1.2,
        }}
      >
        22/12/2022 11:30
      </Typography>

      {/* ================= Status ================= */}
      <Typography
        sx={{
          color: '#FF3562',
          fontWeight: 600,
          fontSize: { xs: 12, sm: 13 },
          lineHeight: 1.2,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        Cancelado
      </Typography>
    </Box>
  );
}
