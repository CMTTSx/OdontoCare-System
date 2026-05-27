import * as React from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import AtendimentoModal from '../AdicionarAtendimentoModal';
import ServiceBar from '../ServiceBar';
import Dummybar from '../ServiceBar/DummyBar';
import Dummybar2 from '../ServiceBar/DummyBar2';
import Dummybar3 from '../ServiceBar/DummyBar3';
import Dummybar4 from '../ServiceBar/DummyBar4';

function TabPanel({
  children,
  value,
  index,
}: {
  children?: React.ReactNode;
  value: number;
  index: number;
}) {
  if (value !== index) return null;

  return (
    <Box sx={{ pt: 3, width: '100%' }}>
      {children}
    </Box>
  );
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: '63%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        boxSizing: 'border-box',

        /* mesmo ajuste do TopBar */
        ml: {
          xs: -1,     
          sm: 'auto',
        },
        mr: 'auto',

        px: {
          xs: 0,     
          sm: 2,
          md: 3,
        },

        mt: { xs: 3, md: 6 },
      }}
    >
      {/* ================= TABS ================= */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={(_, v) => setValue(v)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            width: {
              xs: '100%',
              sm: '100%',
              md: '100%',
              lg: '100%',
            },
            '& .MuiTabs-flexContainer': {
              justifyContent: {
                xs: 'flex-start', // mobile natural
                sm: 'flex-end',   // desktop à direita
              },
            },
          }}
        >
          <Tab label="Atendimentos" />
          <Tab label="Finalizados" />
          <Tab label="Todos" />
        </Tabs>
      </Box>

      {/* ================= TAB 1 ================= */}
      <TabPanel value={value} index={0}>
        <Box sx={{ width: '100%' }}>
          <ServiceBar />
          <Dummybar />
        </Box>

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <AtendimentoModal />
        </Box>
      </TabPanel>

      {/* ================= TAB 2 ================= */}
      <TabPanel value={value} index={1} />

      {/* ================= TAB 3 ================= */}
      <TabPanel value={value} index={2}>
        <ServiceBar />
        <Dummybar />
        <Box mt={1}><Dummybar2 /></Box>
        <Box mt={1}><Dummybar3 /></Box>
        <Box mt={1}><Dummybar4 /></Box>
      </TabPanel>
    </Box>
  );
}
