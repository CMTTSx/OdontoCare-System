import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography } from '@mui/material'
import api from '../../services/api';
import { getPerfilLabel } from '../../services/perfis';

//Button
import MenuArrow from '../MenuProfile';

//Icons
import Logotipo from '../../assets/ODCSYSTEM.png';

//===============BREAKPOINTS===================//

const BoxConfig = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  bgcolor: '#000744',
  px: { xs: 1, sm: 2 },
  boxSizing: 'border-box',
}

const Logo = {
  display: 'block',
  width: { xs: '8rem', sm: '10rem' },
  height: { xs: '2.5rem', sm: '3rem' },
  objectFit: 'contain',
  objectPosition: 'left center',
  flexShrink: 0,
  alignSelf: 'center',
}

const TypographyTopBar = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#f5f5f5',
  minWidth: 0,
  ml: 'auto',
  mr: { xs: 0, sm: 1 },
  p: '0.3rem',
  textAlign: 'right',
  '& > *': {
    maxWidth: { xs: 120, sm: 240, md: 360 },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}

export default function Navbar() {
  const [userName, setUserName] = React.useState('');
  const [userProfile, setUserProfile] = React.useState('Sem perfil');

  React.useEffect(() => {
    let mounted = true;

    async function carregarUsuarioLogado() {
      try {
        const response = await api.get('/usuarios/me');

        if (mounted) {
          setUserName(response.data.fullName || response.data.email || '');
          setUserProfile(getPerfilLabel(response.data.perfil));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário logado:', error);
      }
    }

    carregarUsuarioLogado();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Box sx={BoxConfig}>
      <Box
        component={RouterLink}
        to="/paginaInicial"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={Logotipo}
          alt="ODC System"
          sx={Logo}
        />
      </Box>

      <Box sx={TypographyTopBar}>
        <Typography sx={{ fontSize: 12 }}>{userName}</Typography>
        <Typography sx={{ fontSize: 12 }}>{userProfile}</Typography>
      </Box>

      <MenuArrow />
    </Box>
  );
}
