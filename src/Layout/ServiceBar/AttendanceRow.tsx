import { Box, Typography } from '@mui/material';
import AtendimentoPopover from '../AtendimentoPopover';

type AttendanceRowProps = {
  name: string;
  age: string;
  dateTime: string;
  status: string;
  color: string;
  showActions?: boolean;
};

export default function AttendanceRow({
  name,
  age,
  dateTime,
  status,
  color,
  showActions = false,
}: AttendanceRowProps) {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: '#dbdbdb',
        borderLeft: 5,
        borderLeftColor: color,
        boxShadow: 2,
        mb: 1,
        backgroundColor: '#fff',
        px: 2,
        py: 1,
        width: '100%',
        mx: 0,
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: '2fr 1.5fr 130px 40px',
        },
        alignItems: 'center',
        columnGap: {
          xs: 0,
          md: 1,
        },
        rowGap: {
          xs: 0.5,
          md: 0,
        },
      }}
    >
      <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography fontWeight={600} fontSize={{ xs: 13, sm: 14 }} lineHeight={1.2}>
          {name}
        </Typography>

        <Typography fontSize={{ xs: 12, sm: 13 }} lineHeight={1.2}>
          {age}
        </Typography>
      </Box>

      <Typography
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          fontSize: { xs: 12, sm: 13 },
          lineHeight: 1.2,
        }}
      >
        {dateTime}
      </Typography>

      <Typography
        sx={{
          color,
          fontWeight: 600,
          fontSize: { xs: 12, sm: 13 },
          lineHeight: 1.2,
          textAlign: { xs: 'center', md: 'left' },
          whiteSpace: 'nowrap',
        }}
      >
        {status}
      </Typography>

      <Box
        sx={{
          minWidth: 40,
          minHeight: 32,
          display: 'flex',
          justifyContent: {
            xs: 'center',
            md: 'flex-end',
          },
          alignItems: 'center',
        }}
      >
        {showActions && <AtendimentoPopover />}
      </Box>
    </Box>
  );
}
