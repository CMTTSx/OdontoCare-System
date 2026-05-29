import * as React from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Tab, Tabs, Typography } from '@mui/material';

import AtendimentoModal from '../AdicionarAtendimentoModal';
import ServiceBar from '../ServiceBar';
import AttendanceCrudModal from '../ServiceBar/AttendanceCrudModal';
import { allAttendanceMockups } from '../ServiceBar/mockData';
import { AttendanceItem, AttendanceStatus } from '../ServiceBar/types';

const getStatusColor = (status: AttendanceStatus) => {
  switch (status) {
    case 'Em Atendimento':
      return '#05F140';
    case 'Agendado':
      return '#5465FF';
    case 'Faltou':
      return '#FF9000';
    case 'Cancelado':
      return '#FF3562';
    case 'Finalizado':
      return '#0F9D58';
    default:
      return '#5465FF';
  }
};

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
  const [items, setItems] = React.useState<AttendanceItem[]>(allAttendanceMockups);
  const [editingItem, setEditingItem] = React.useState<AttendanceItem | null>(null);
  const [cancelItem, setCancelItem] = React.useState<AttendanceItem | null>(null);

  const activeItems = items.filter((item) => item.status !== 'Finalizado' && item.status !== 'Cancelado');
  const finishedItems = items.filter((item) => item.status === 'Finalizado');
  const allItems = items;

  const handleSave = (updated: AttendanceItem) => {
    setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setEditingItem(null);
  };

  const handleConfirmCancel = () => {
    if (!cancelItem) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === cancelItem.id
          ? {
              ...item,
              status: 'Cancelado',
              color: getStatusColor('Cancelado'),
              isMockup: false,
            }
          : item
      )
    );
    setCancelItem(null);
  };

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
          {activeItems.map((item) => (
            <ServiceBar
              key={item.id}
              {...item}
              showActions
              onEdit={() => setEditingItem(item)}
              onCancel={() => setCancelItem(item)}
            />
          ))}
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
      <TabPanel value={value} index={1}>
        <Box sx={{ width: '100%' }}>
          {finishedItems.map((item) => (
            <ServiceBar key={item.id} {...item} />
          ))}
        </Box>
      </TabPanel>

      {/* ================= TAB 3 ================= */}
      <TabPanel value={value} index={2}>
        <Box sx={{ width: '100%' }}>
          {allItems.map((item) => (
            <ServiceBar
              key={item.id}
              {...item}
              showActions
              onEdit={() => setEditingItem(item)}
              onCancel={() => setCancelItem(item)}
            />
          ))}
        </Box>
      </TabPanel>

      <Typography
        sx={{
          mt: 2,
          color: '#dc2626',
          fontWeight: 700,
          fontSize: 13,
          textAlign: 'center',
        }}
      >
        Versão demonstrativa. Os itens marcados como mockup serão substituídos pelo CRUD.
      </Typography>

      <AttendanceCrudModal
        open={Boolean(editingItem)}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onSave={handleSave}
      />

      <Dialog open={Boolean(cancelItem)} onClose={() => setCancelItem(null)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Cancelar Atendimento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja cancelar o atendimento de{' '}
            <strong>{cancelItem?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCancelItem(null)} sx={{ color: '#666' }}>
            Voltar
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmCancel}
            sx={{ backgroundColor: '#EF4444', '&:hover': { backgroundColor: '#db0b00' } }}
          >
            Cancelar Atendimento
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
