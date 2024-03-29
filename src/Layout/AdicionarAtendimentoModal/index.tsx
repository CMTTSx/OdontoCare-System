import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #028be6',
  borderRadius: 1,
  boxShadow: 2,
  p: 4,

  '@media (min-width: 320px)': {
    width: 180,
    mt: 10,
    ml: 3.6,
  },
  '@media (min-width: 360px)': {
    width: 210,
    mt: 10,
    ml: 3,
  },
  '@media (min-width: 375px)': {
    width: 220,
    mt: 0,
    ml: 3,
  },
  '@media (min-width: 384px)': {
    width: 220,
    mt: 0,
    ml: 3,
  },
  '@media (min-width: 410px)': {
    width: 250,
    mt: -5,
    ml: 3,
  },
  '@media (min-width: 425px)': {
    width: 260,
    mt: 0,
    ml: 2,
  },
  '@media (min-width: 768px)': {
    width: 525,
    mt: 0,
    ml: 2,
  },
  '@media (min-width: 800px)': {
    mt: -30,
  },
  '@media (min-width: 810px)': {
    ml: 0 ,
    mt: -15,
  },
  '@media (min-width: 1024px) ': {
    ml: 5,
    mt: -20,
    width: '40%',
  },
  '@media (min-width: 1280px) ': {
    ml: 5,
    mt: 10,
    width: '40%',
  },
  '@media (min-width: 1440px) ': {
    ml: 5,
    mt: -10,
    width: '40%',
  },
  '@media (min-width: 1920px) ': {
    mt: -10,
    ml: -6,
    width: '40%',
  },
  '@media (min-width: 2560px) ': {
    mt: -30,
    ml: -10,
    width: '30%',
  },
  '@media (min-width: 3840px) ': {
    mt: -70,
    ml: -30,
    width: '25%',
  },
  

  
};

const ButtonConfig = {
  mt: 5,
  ml: 23,

  '@media (min-width: 320px)': {
    ml: -5,
  },
  '@media (min-width: 360px)': {
    ml: -5,
  },
  '@media (min-width: 390px)': {
    ml: -5.5,
  },
  '@media (min-width: 411px)': {
    ml: -4,
  },
  '@media (min-width: 425px)': {
    ml: 22.5,
  },
  '@media (min-width: 1280px)': {
    ml: 35,
  },
  '@media (min-width: 1440px)': {
    ml: 43,
  },
  '@media (min-width: 1920px)': {
    ml: 23,
  },
  '@media (min-width: 2560px)': {
    ml: 23,
  },
  '@media (min-width: 3840px) ': {
    ml: 45,
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
    ml: 9.5,
  },
  '@media (min-width: 360px)': {
    ml: 5,
  },
  '@media (min-width: 375px)': {
    ml: 6,
  },
  '@media (min-width: 425px)': {
    ml: -19,
  },
  '@media (min-width: 768px)': {
    ml: 16,
  },
  '@media (min-width: 1024px)': {
    ml: 2.8,
  },
  '@media (min-width: 1920px)': {
    ml: 47,
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
    ml: 9.5,
  },
  '@media (min-width: 360px)': {
    ml: 18,
    mt: -7.4,
  },
  '@media (min-width: 375px)': {
    ml: 20,
    mt: -7.3,
  },
  '@media (min-width: 425px)': {
    mt: -0.1,
    ml: 1,
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
          <TextField id="outlined-basic" label="Digite o nome do paciente" variant="outlined" fullWidth={true} />

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
