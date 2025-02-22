import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1em',
  bgcolor: 'background.paper',
  border: '2px solid #028be6',
  borderRadius: 1,
  boxShadow: 2,
  p: 4,

  '@media (min-width: 320px)': {
    width: '10rem',
    mt: 10,
    ml: 4.5,
  },
  '@media (min-width: 375px)': {
    width: 220,
    mt: 0,
    ml: 4,
  },
  '@media (min-width: 425px)': {
    width: 230,
    ml: -2,
  },
  '@media (min-width: 768px)': {
    width: 525,
    mt: 0,
    ml: 2,
  },
  '@media (min-width: 1024px) ': {
    ml: 5,
    mt: -20,
    width: '40%',
  },
  '@media (min-width: 1440px) ': {
    ml: 5,
    mt: -10,
    width: '40%',
  },
  '@media (min-width: 3440px) ': {
    mt: '-10%',
    ml: -10,
    width: '30%',
  },

};

const ButtonConfig = {
  mt: 5,
  ml: 23,

  '@media (min-width: 320px)': {
    ml: -10,
  },
  '@media (min-width: 425px)': {
    ml: 22.5,
  },
  '@media (min-width: 1440px)': {
    ml: '60%',
  },
  '@media (min-width: 3440px)': {
    ml: '76%',
  },

}

const AdicionarConfig = {
  display: 'inline',
  backgroundColor: '#4DEA80',
  color: '#fff',
  fontWeight: 600,

  "&:hover": {
    backgroundColor: '#05e340'
  },

  '@media (min-width: 320px)': {
    ml: 8,
  },
  '@media (min-width: 375px)': {
    ml: 11,
  },
  '@media (min-width: 425px)': {
    ml: -19,
  },
  '@media (min-width: 768px)': {
    ml: 16,
  },
  '@media (min-width: 1024px)': {
    ml: 4,
    mr: -5,
  },
}

const CancelarConfig = {
  display: 'inline',
  backgroundColor: '#EF4444',
  color: '#fff',
  fontWeight: 600,
  ml: 1,
  "&:hover": {
    backgroundColor: '#db0b00'
  },

  '@media (min-width: 320px)': {
    ml: 20.5,
    mt: -7.2,
  },
  '@media (min-width: 375px)': {
    ml: 24,
    mt: -7.3,
  },
  '@media (min-width: 425px)': {
    mt: -0.1,
    ml: 1,
  },
  '@media (min-width: 1024px)': {
    mt: -0.1,
    ml: 6,
  },

}

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button onClick={handleOpen} sx={{
        backgroundColor: '#028be6',
        color: '#fff',
        fontWeight: 600,
        "&:hover": {
          backgroundColor: '#089bfc',
        }

      }}>Adicionar Atendimento</Button>
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
            fontSize: 20,
            textAlign: 'center',
            ml: 0
          }}>
            Adicionar Atendimento
          </Typography>

          <Box sx={{
            mt: 2,
          }}>
            <TextField id="outlined-basic" label="Digite o nome do paciente" variant="outlined" fullWidth={true} inputProps={{ maxLength: 80 }}
            />
          </Box>

          <Box sx={ButtonConfig}>
            <Button sx={AdicionarConfig}>Adicionar</Button>
            <Button
              onClick={handleClose}
              sx={CancelarConfig}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
