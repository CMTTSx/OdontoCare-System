import React from 'react';
import { Box } from '@mui/material';
import BasicLayout from '../Layout/BasicLayout/BasicLayout';
import Breadcrumbs from '../Layout/Breadcrumbs/Home';
import DemoNotice from '../Layout/DemoNotice';
import Tabs from '../Layout/Tabs';
import TopBar from '../Layout/Topbar';
import StatusSummary from '../Layout/Topbar/StatusSummary';

export default function Home() {
  return (
    <BasicLayout>
      {/* Breadcrumbs logo abaixo da Navbar */}
      <Breadcrumbs />
      <DemoNotice />

      {/* TopBar e Tabs */}
      <Box sx={{ mt: 2 }}>
        <TopBar hideStatusesOnXl />
        <Box
          sx={{
            display: 'none',
            '@media (min-width:2560px)': {
              display: 'flex',
              mt: 2,
              px: 10,
            },
          }}
        >
          <StatusSummary />
        </Box>
        <Tabs />
      </Box>

    </BasicLayout>
  );
}
