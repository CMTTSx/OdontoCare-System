import * as React from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async () => {
    // Lógica para adicionar o atendimento
    }

  return (
    <Box>
      {/* BOTÃO DE ABRIR */}
      <Button
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#028be6',
          color: '#fff',
          fontWeight: 600,
          '&:hover': { backgroundColor: '#089bfc' },
        }}
      >
        Adicionar Atendimento
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            bgcolor: 'background.paper',
            border: '2px solid #028be6',
            borderRadius: 2,
            boxShadow: 5,

            // 🔑 largura responsiva REAL
            width: {
              xs: '85%',     // 320px
              sm: 360,
              md: 480,
              lg: 560,
            },

            p: 3,
            boxSizing: 'border-box',
          }}
        >
          {/* TÍTULO */}
          <Typography
            fontWeight={600}
            fontSize={{ xs: 16, sm: 18 }}
            textAlign="center"
          >
            Adicionar Atendimento
          </Typography>

          {/* INPUT */}
          <Box mt={3}>
            <TextField
              label="Digite o nome do paciente"
              fullWidth
              inputProps={{ maxLength: 80 }}
            />
          </Box>

          {/* BOTÕES */}
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 1 }}>
                     
                     <Button
                     onClick={() => setOpen(false)} sx={{
                       backgroundColor: '#EF4444',
                       color: '#fff',
                       fontWeight: 600,
                       '&:hover': { backgroundColor: '#db0b00' },
                     }}
                   >
                     Cancelar
                   </Button>
         
                     <Button
                     onClick={handleSubmit}
                     sx={{
                       backgroundColor: '#4DEA80',
                       color: '#fff',
                       fontWeight: 600,
                       '&:hover': { backgroundColor: '#05e340' },
                     }}
                   >
                     Adicionar
                   </Button>
         
                   </Box>
        </Box>
      </Modal>
    </Box>
  );
}
