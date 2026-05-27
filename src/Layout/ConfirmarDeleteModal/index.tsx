import React from 'react';
import {
  Modal,
  Box,
  Button,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import { BsX, BsExclamationTriangle } from 'react-icons/bs';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirmar: () => void;
  usuarioNome: string;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: '#fff',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ConfirmarDeleteModal({ 
  open, 
  onClose, 
  onConfirmar, 
  usuarioNome 
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box sx={modalStyle}>
        {/* HEADER */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2 
        }}>
          <Typography 
            id="delete-modal-title" 
            variant="h6" 
            fontWeight={600}
            sx={{ color: '#ef4444' }}
          >
            Confirmar Exclusão
          </Typography>
          <IconButton 
            onClick={onClose} 
            size="small"
            sx={{
              '&:hover': {
                backgroundColor: '#f3f4f6',
              },
            }}
          >
            <BsX size={24} />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* CONTEÚDO */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          mb: 3 
        }}>
          {/* ÍCONE DE ALERTA */}
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <BsExclamationTriangle size={35} color="#ef4444" />
          </Box>

          {/* MENSAGEM */}
          <Typography 
            id="delete-modal-description"
            align="center" 
            sx={{ mb: 1, fontSize: '1.1rem' }}
          >
            Tem certeza que deseja excluir?
          </Typography>

          <Typography 
            fontWeight={700} 
            fontSize="1.3rem" 
            sx={{ color: '#ef4444', mb: 2 }}
          >
            {usuarioNome}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ 
              backgroundColor: '#f9fafb',
              p: 1.5,
              borderRadius: 1,
              width: '100%'
            }}
          >
            Esta ação não poderá ser desfeita.
            <br />
            Todos os dados associados a este usuário serão perdidos.
          </Typography>
        </Box>

        {/* BOTÕES */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: 2,
          mt: 2 
        }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: '#666',
              borderColor: '#ccc',
              fontWeight: 500,
              px: 3,
              py: 1,
              '&:hover': {
                borderColor: '#999',
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            onClick={onConfirmar}
            variant="contained"
            sx={{
              backgroundColor: '#ef4444',
              color: '#fff',
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': { 
                backgroundColor: '#db0b00',
              },
              '&:focus': {
                outline: '2px solid #fee2e2',
              },
            }}
          >
            Sim, Excluir Usuário
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}