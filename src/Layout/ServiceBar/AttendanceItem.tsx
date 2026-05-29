import { Box, Chip, Typography } from '@mui/material';
import AtendimentoPopover from '../AtendimentoPopover';
import { AttendanceItem as AttendanceItemType } from './types';

type AttendanceItemProps = AttendanceItemType & {
  showActions?: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
};

export default function AttendanceItem({
  name,
  age,
  dateTime,
  status,
  color,
  showActions = false,
  isMockup = false,
  onEdit,
  onCancel,
}: AttendanceItemProps) {
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
        px: { xs: 2, md: 3, },
        py: 1,
        width: '100%',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateAreas: {
          xs: `
            "name"
            "date"
            "status"
            "mockup"
            "actions"
          `,
          md: `
            "name date status mockup actions"
          `,
        },
        gridTemplateColumns: {
          xs: '1fr',
          md: '2fr 1.5fr 140px 70px 40px',
        },
        '@media (min-width:2560px)': {
          gridTemplateAreas: `
            "name date mockup actions"
            "status status status status"
          `,
          gridTemplateColumns: '2fr 1.5fr 70px 40px',
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
      <Box sx={{ gridArea: 'name', textAlign: { xs: 'center', md: 'left' } }}>
        <Typography fontWeight={600} fontSize={{ xs: 13, sm: 14 }} lineHeight={1.2}>
          {name}
        </Typography>

        <Typography fontSize={{ xs: 12, sm: 13 }} lineHeight={1.2}>
          {age}
        </Typography>
      </Box>

      <Typography
        sx={{
          gridArea: 'date',
          alignSelf: 'center',
          justifySelf: 'center',
          textAlign: 'center',
          fontSize: { xs: 12, sm: 13 },
          lineHeight: 1.2,
          display: 'flex',
          alignItems: 'center',
          minHeight: 32,
          width: '100%',
        }}
      >
        {dateTime}
      </Typography>

      <Chip
        label={status}
        size="small"
        sx={{
          gridArea: 'status',
          alignSelf: 'center',
          justifySelf: { xs: 'center', md: 'start' },
          bgcolor: `${color}20`,
          color,
          fontWeight: 700,
          borderRadius: 999,
          '& .MuiChip-label': {
            px: 1.1,
          },
        '@media (min-width:2560px)': {
          justifySelf: 'start',
          mt: 0.5,
        },
        }}
      />

      <Chip
        label={isMockup ? 'Mockup' : 'CRUD'}
        size="small"
        variant="outlined"
        sx={{
          gridArea: 'mockup',
          alignSelf: 'center',
          justifySelf: { xs: 'center', md: 'start' },
          color: isMockup ? '#B91C1C' : '#166534',
          borderColor: isMockup ? '#F87171' : '#86EFAC',
          fontWeight: 700,
          minHeight: 32,
        }}
      />

      <Box
        sx={{
          gridArea: 'actions',
          alignSelf: 'center',
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
        {showActions && <AtendimentoPopover onEdit={onEdit} onCancel={onCancel} />}
      </Box>
    </Box>
  );
}
