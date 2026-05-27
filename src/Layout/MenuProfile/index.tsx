import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function AccountMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loading, setLoading] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const AvatarConfig = {
    backgroundColor: '#5cb6fa',
    width: '1.5rem',
    height: '1.5rem',

    '@media (min-width: 375px)': {
      ml: '5%',
    },

    '@media (min-width: 425px)': {
      ml: '5%',
    },
  };

  const funcaoLogout = async () => {
    try {
      setLoading(true);
      
      // Fecha o menu
      handleClose();

      // Pega o refresh token
      const refreshToken = sessionStorage.getItem('@airbnb-RefreshToken') || '';

      // Tenta fazer logout no backend
      if (refreshToken) {
        try {
          await api.post(
            '/auth/logout',
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          console.log('✅ Backend confirmou logout');
        } catch (error: any) {
          console.error('⚠️ Erro ao fazer logout no backend:', error.response?.data || error);
          // Continua mesmo se o backend falhar
        }
      }
    } catch (error) {
      console.error('❌ Erro no processo de logout:', error);
    } finally {
      // ✅ Remove os tokens SEMPRE
      sessionStorage.removeItem('@airbnb-Token');
      sessionStorage.removeItem('@airbnb-RefreshToken');
      localStorage.removeItem('token');
      
      setLoading(false);

      // ✅ Redireciona para o login
      navigate('/login', { replace: true });
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Configurações de Conta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            disabled={loading}
          >
            <Avatar sx={AvatarConfig}>F</Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Avatar sx={{ width: 32, height: 32 }} />
          </ListItemIcon>
          <Typography>Perfil</Typography>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Typography>Configurações</Typography>
        </MenuItem>

        <MenuItem onClick={funcaoLogout} disabled={loading}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography>{loading ? 'Saindo...' : 'Sair'}</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}