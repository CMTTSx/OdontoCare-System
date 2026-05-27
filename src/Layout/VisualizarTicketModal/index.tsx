import * as React from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { FaEye } from 'react-icons/fa';
import api from '../../services/api';

type Props = {
  ticketId: number;
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: '90%', md: 750 },
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #028be6',
  borderRadius: 1,
  boxShadow: 2,
  p: { xs: 2, md: 4 },
  display: 'flex',
  flexDirection: 'column',
};

export default function VisualizarTicketModal({ ticketId }: Props) {
  const [open, setOpen] = React.useState(false);
  const [ticket, setTicket] = React.useState<any>(null);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [resposta, setResposta] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);

    try {
      const [ticketRes, messageRes] = await Promise.all([
        api.get(`/suporte/${ticketId}`), 
        api.get(`/ticket-messages/suporte/${ticketId}`),
      ]);

      setTicket(ticketRes.data);
      setMessages(messageRes.data);
    } catch (error) {
      console.error('Erro ao carregar ticket', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setResposta('');
  };

  const submitAnswer = async () => {
    if (!resposta.trim()) {
      alert('Digite uma mensagem');
      return;
    }

    try {
      setSending(true);

      const response = await api.post(
        `/ticket-messages/${ticketId}`,
        { message: resposta }
      );

      setMessages(prev => [...prev, response.data]);
      setResposta('');
    } catch (error) {
      console.error('Erro ao enviar resposta', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} sx={{ color: '#fff' }}>
        <FaEye />
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              fontSize: { xs: 16, md: 20 },
              mb: 2,
            }}
          >
            Ticket #{ticket?.id} — {ticket?.description}
          </Typography>

          <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : messages.length > 0 ? (
              messages.map(msg => (
                <Box
                  key={msg.id}
                  sx={{
                    mb: 2,
                    p: 1.5,
                    borderRadius: 1,
                    backgroundColor:
                      msg.origin === 'SUPORTE' ? '#eef4ff' : '#f5f5f5',
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {msg.origin === 'SUPORTE' ? 'Suporte' : 'Usuário'}
                  </Typography>

                  <Typography sx={{ mt: 0.5 }}>
                    {msg.message}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: '#666',
                      textAlign: 'right',
                      mt: 0.5,
                    }}
                  >
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleString()
                      : ''}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography
                sx={{
                  textAlign: 'center',
                  color: '#888',
                  fontStyle: 'italic',
                }}
              >
                Nenhuma mensagem neste ticket
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Digite sua resposta"
              value={resposta}
              onChange={(e) => setResposta(e.target.value)}
              disabled={sending}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1,
              mt: 2,
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              Fechar
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={submitAnswer}
              disabled={sending}
            >
              {sending ? 'Enviando...' : 'Enviar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}