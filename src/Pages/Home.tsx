import React from 'react';
import { Box } from '@mui/material';
import BasicLayout from '../Layout/BasicLayout/BasicLayout';
import Breadcrumbs from '../Layout/Breadcrumbs/Home';
import DemoNotice from '../Layout/DemoNotice';
import Tabs from '../Layout/Tabs';
import TopBar from '../Layout/Topbar';
import { allAttendanceMockups } from '../Layout/ServiceBar/mockData';
import { AttendanceItem } from '../Layout/ServiceBar/types';

export default function Home() {
  const [items, setItems] = React.useState<AttendanceItem[]>(allAttendanceMockups);

  return (
    <BasicLayout>
      {/* Breadcrumbs logo abaixo da Navbar */}
      <Breadcrumbs />
      <DemoNotice />

      {/* TopBar e Tabs */}
      <Box sx={{ mt: 2 }}>
        <TopBar hideStatusesOnXl items={items} />
        <Tabs items={items} setItems={setItems} />
      </Box>

    </BasicLayout>
  );
}
