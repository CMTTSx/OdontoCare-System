import { Box, Typography } from '@mui/material';
import AtendimentoPopover from '../AtendimentoPopover';

export default function ServiceBar() {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: '#dbdbdb',
        borderLeft: 5,
        borderLeftColor: '#05F140',
        boxShadow: 2,
        mb: 1,
        backgroundColor: '#fff',

        px: 2,
        py: 1,

        width: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '100%',
        },

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
      <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography
          fontWeight={600}
          fontSize={{ xs: 13, sm: 14 }}
          lineHeight={1.2}
        >
          Mayara Silva Souza
        </Typography>

        <Typography
          fontSize={{ xs: 12, sm: 13 }}
          lineHeight={1.2}
        >
          26 Anos e 7 Meses
        </Typography>
      </Box>

      <Typography
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          fontSize: { xs: 12, sm: 13 },
          lineHeight: 1.2,
        }}
      >
        22/12/2022 10:30
      </Typography>

      <Typography
        sx={{
          color: '#05F140',
          fontWeight: 600,
          fontSize: { xs: 12, sm: 13 },
          lineHeight: 1.2,
          minWidth: 110,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        Em Atendimento
      </Typography>

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
