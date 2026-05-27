import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import api from '../../services/api';
import VisualizarTicketModal from '../VisualizarTicketModal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #028be6',
  borderRadius: 1,
  boxShadow: 2,
  p: 4,
  cursor: 'pointer',

  '@media (min-width: 320px)': {
    ml: 3,
    mt: 0,
    width: 160,
  },
  '@media (min-width: 360px)': {
    width: 190,
  },
  '@media (min-width: 375px)': {
    width: 220,
  },
  '@media (min-width: 390px)': {
    width: 240,
  },
  '@media (min-width: 425px)': {
    width: 265,
  },
  '@media (min-width: 768px)': {
    ml: 0,
    mt: 0,
    width: 400,
  },
  '@media (min-width: 800px)': {
    mt: -15,
    width: 400,
  },
  '@media (min-width: 1024px)': {
    ml: 0,
    mt: 0,
  },
  '@media (min-width: 1280px)': {
    ml: 5,
    mt: 0,
  },
  '@media (min-width: 3840px)': {
    ml: 0,
    mt: -80,
  }

};

const SairConfig = {
  display: 'inline',
  backgroundColor: '#EF4444',
  color: '#fff',
  fontWeight: 600,
  ml: 14,

  "&:hover": {
    backgroundColor: '#db0b00'
  },
  '@media (min-width: 320px)': {
    ml: -53.5,
  },
  '@media (min-width: 360px)': {
    ml: -51,
  },
  '@media (min-width: 375px)': {
    ml: -46,
  },
  '@media (min-width: 390px)': {
    ml: -43,
  },
  '@media (min-width: 425px)': {
    ml: -39,
  },
  '@media (min-width: 768px)': {
    ml: -23,
  },

}

export default function VerificarNovoTicketModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ticket, setTicket] = React.useState<{ id?: number;[key: string]: any }>({});

  //Função verificar ticket
  React.useEffect(() => {
    const verificarTicket = async () => {
      try {
        const response = await api.get('/suporte');
        if (response.data) {
          setTicket(response.data);
        } else {
          setTicket({});
        }
      } catch (error) {
        console.error('Erro ao verificar ticket:', error);
        setTicket({});
      }
    };
    verificarTicket();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen} sx={{
        backgroundColor: '#00c914',
        color: '#fff',
        fontWeight: 600,
        width: '80%',
        p: 2,

        "&:hover": {
          backgroundColor: '#25eb02',

        }
      }}> Verificar Ticket</Button>
      <Modal
        hideBackdrop={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{
            fontWeight: 600,
            fontSize: 30,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',

          }}>
            Suporte
          </Typography>


          {/* Informações do ticket */}

          {ticket.length > 0 ? (
            ticket.map((item: { id: number;[key: string]: any }) => (
              <Box
                key={item.id}
                sx={{
                  border: 1,
                  borderColor: '#c5c7c5',
                  backgroundColor: '#6C8EAD',
                  height: '2em',
                  mt: 2.5,
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography
                  sx={{
                    mt: 0.7,
                    ml: 2,
                    color: '#fff',
                    fontWeight: 600,
                  }}
                >
                  # <span>{item.id}</span>
                </Typography>

                <Button sx={{ ml: 'auto', color: '#fff' }}>
                  <VisualizarTicketModal ticketId={item.id} />
                </Button>
              </Box>
            ))
          ) : (
            <Typography
              sx={{
                mt: 4,
                textAlign: 'center',
                color: '#888',
                fontStyle: 'italic',
              }}
            >
              Nenhum ticket disponível
            </Typography>
          )}

          <Box sx={{
            mt: 5,
            ml: 65,
          }}>
            <Button
              onClick={handleClose}
              sx={SairConfig}>Sair</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
