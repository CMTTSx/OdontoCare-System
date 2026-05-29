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
  bgcolor: '#000744',
  mt: -1,
  ml: -1,
  pr: 1,
}

const Logo = {
  display: 'block',
  width: '10rem',
  height: '3rem',
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
  fontSize: 10,
  p: '0.3rem',

  '@media (min-width: 375px)': {
    ml: '15%',
  },
  '@media (min-width: 425px)': {
    ml: '25%',
  },
  '@media (min-width: 768px)': {
    ml: '58%',
  },
  '@media (min-width: 1024px)': {
    ml: '66%',
    mt: '0.45rem'
  },
  '@media (min-width: 1440px)': {
    ml: '75%',
  },
  '@media (min-width: 2560px)': {
    ml: '82%',
    mt: '0.8rem'
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
