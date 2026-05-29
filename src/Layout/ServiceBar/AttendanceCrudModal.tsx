import * as React from 'react';
import { Box, Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { AttendanceItem, AttendanceStatus } from './types';

type Props = {
  open: boolean;
  item: AttendanceItem | null;
  onClose: () => void;
  onSave: (item: AttendanceItem) => void;
};

export default function AttendanceCrudModal({ open, item, onClose, onSave }: Props) {
  const [form, setForm] = React.useState<AttendanceItem | null>(item);

  React.useEffect(() => {
    setForm(item);
  }, [item]);

  if (!form) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 5,
          p: 3,
          width: { xs: '90%', sm: 420, md: 520 },
          boxSizing: 'border-box',
        }}
      >
        <Typography fontWeight={700} fontSize={18} textAlign="center">
          Editar Atendimento
        </Typography>

        <Box sx={{ mt: 2, display: 'grid', gap: 2 }}>
          <TextField
            label="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Idade"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            fullWidth
          />
          <TextField
            label="Data e hora"
            value={form.dateTime}
            onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
            fullWidth
          />
          <TextField
            label="Status"
            select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as AttendanceStatus })}
            fullWidth
          >
            {[
              'Em Atendimento',
              'Agendado',
              'Faltou',
              'Cancelado',
              'Finalizado',
            ].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Cor"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={onClose} sx={{ color: '#666' }}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => onSave(form)}
            sx={{ backgroundColor: '#0053d9', '&:hover': { backgroundColor: '#0042b3' } }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
