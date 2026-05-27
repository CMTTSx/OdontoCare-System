import * as React from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import api from '../../services/api';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 720,
  bgcolor: '#fff',
  borderRadius: 2,
  boxShadow: 6,
  p: 4,
};

const actionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 2,
  mt: 4,
};

export default function AdicionarTicketModal() {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  /* ================= USUÁRIO LOGADO ================= */

  React.useEffect(() => {
    if (!open) return;

    async function carregarUsuarioLogado() {
      try {
        const response = await api.get('/usuarios/me');
        setName(response.data.fullName);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Erro ao carregar usuário logado', error);
      }
    }

    carregarUsuarioLogado();
  }, [open]);

  /* ================= FUNÇÃO COMPLETA ================= */

  async function enviarTicketComMensagem() {
    if (!description.trim() || !message.trim()) {
      alert('Preencha assunto e mensagem.');
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Criar ticket
      const ticketResponse = await api.post('/suporte', {
        name,
        email,
        description,
      });

      const ticketId = ticketResponse.data.id;

      // 2️⃣ Criar primeira mensagem vinculada
      await api.post(`/ticket-messages/${ticketId}`, {
        message,
      });

      // Limpar formulário
      setDescription('');
      setMessage('');
      setOpen(false);

    } catch (error) {
      console.error('Erro ao enviar ticket:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#028be6',
          color: '#fff',
          fontWeight: 600,
          px: 4,
          py: 1.5,
          mt: 4,
          borderRadius: 1.5,
          '&:hover': { backgroundColor: '#0066cc' },
        }}
      >
        Adicionar Novo Ticket
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              textAlign: 'center',
              mb: 2,
            }}
          >
            Suporte
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nome"
              value={name}
              fullWidth
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Email"
              value={email}
              fullWidth
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Assunto"
              value={description}
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* 🔥 CORRIGIDO AQUI */}
            <TextField
              label="Mensagem"
              multiline
              minRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
            />
          </Box>

          <Box sx={actionsStyle}>
            <Button
              onClick={() => setOpen(false)}
              variant="outlined"
              sx={{
                color: '#ef4444',
                borderColor: '#ef4444',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  borderColor: '#ef4444',
                },
              }}
            >
              Cancelar
            </Button>

            <Button
              onClick={enviarTicketComMensagem}
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: '#22c55e',
                '&:hover': { backgroundColor: '#16a34a' },
              }}
            >
              {loading ? 'Enviando...' : 'Enviar Ticket'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}