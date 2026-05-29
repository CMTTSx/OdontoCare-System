import { Box } from '@mui/material';
import StatusSummary from './StatusSummary';

type TopBarProps = {
  hideStatusesOnXl?: boolean;
};

export default function TopBar({ hideStatusesOnXl = false }: TopBarProps) {
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
        <StatusSummary />
      </Box>
    </Box>
  );
}
