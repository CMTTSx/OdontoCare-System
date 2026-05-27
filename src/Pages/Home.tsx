import React from 'react';
import { Box } from '@mui/material';
import BasicLayout from '../Layout/BasicLayout/BasicLayout';
import Breadcrumbs from '../Layout/Breadcrumbs/Home';
import Tabs from '../Layout/Tabs';
import TopBar from '../Layout/Topbar';

export default function Home() {
  return (
    <BasicLayout>
      {/* Breadcrumbs logo abaixo da Navbar */}
      <Breadcrumbs />

      {/* TopBar e Tabs */}
      <Box sx={{ mt: 2 }}>
        <TopBar />
        <Tabs />
      </Box>

    </BasicLayout>
  );
}
