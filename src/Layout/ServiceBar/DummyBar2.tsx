import { Box, Typography } from '@mui/material';

export default function ServiceBar() {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: '#dbdbdb',
        borderLeft: 5,
        borderLeftColor: '#FF9000',
        boxShadow: 2,
        mb: 1,
        backgroundColor: '#fff',

        px: 2,
        py: 1,

        // largura responsiva (mesmo padrão validado)
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
          xs: '1fr',
          md: '2fr 1.5fr 1fr',
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
          Dionária Almeida Luz
        </Typography>

        <Typography
          fontSize={{ xs: 12, sm: 13 }}
          lineHeight={1.2}
        >
          24 Anos e 6 Meses
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
          color: '#FF9000',
          fontWeight: 600,
          fontSize: { xs: 12, sm: 13 },
          lineHeight: 1.2,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        Faltou
      </Typography>
    </Box>
  );
}
