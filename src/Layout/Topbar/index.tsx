import { Box } from '@mui/material';
import StatusSummary from './StatusSummary';
import { AttendanceItem } from '../ServiceBar/types';

type TopBarProps = {
  hideStatusesOnXl?: boolean;
  items: AttendanceItem[];
};

export default function TopBar({ hideStatusesOnXl = false, items }: TopBarProps) {
  const atendidos = items.filter((item) => item.status === 'Finalizado').length;
  const cancelados = items.filter((item) => item.status === 'Cancelado').length;
  const faltas = items.filter((item) => item.status === 'Faltou').length;

  return (
    <Box sx={{ mt: 4 }}>
      <Box
        sx={{
          display: {
            xs: 'flex',
            xl: hideStatusesOnXl ? 'none' : 'flex',
          },
        }}
      >
        <StatusSummary atendidos={atendidos} cancelados={cancelados} faltas={faltas} />
      </Box>
    </Box>
  );
}
