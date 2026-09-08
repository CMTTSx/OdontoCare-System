import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { usuarioLogadoIsAdmin } from '../../services/permissions';

// Ícones
import DashboardIcon from '../../assets/Dashboard.png';
import AgendaIcon from '../../assets/agenda.png';
import SuporteIcon from '../../assets/suporte.svg';
import ClientesIcon from '../../assets/clientes.png';
import FinanceiroIcon from '../../assets/controle-financeiro.png';
import UsuariosIcon from '../../assets/usuarios.png';

type MenuItemProps = {
  to: string;
  icon: string;
  label: string;
};

export default function Sidebar() {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    async function carregarPermissao() {
      try {
        setLoading(true);
        setError(false);
        
        const admin = await usuarioLogadoIsAdmin();

        if (mounted) {
          setIsAdmin(admin);
        }
      } catch (err) {
        console.error('Erro ao verificar permissão do usuário:', err);

        if (mounted) {
          setIsAdmin(false);
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    carregarPermissao();

    return () => {
      mounted = false;
    };
  }, []);

  const SidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minHeight: 0,
    boxSizing: 'border-box',
    overflow: 'hidden',
    boxShadow: 5,
    backgroundColor: '#F1F4FE',
    transition: 'width 0.3s ease',

    '@media (min-width: 1024px)': {
      '&:hover': {
        width: '13em',
      },
    },
  };

  const MenuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    px: 2,
    py: 2,
    color: '#0f0f0f',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#e4e9ff',
    },
  };

  const IconStyle = {
    width: 32,
    height: 32,
    flexShrink: 0,
  };

  const TextStyle = {
    whiteSpace: 'nowrap',
    fontSize: '1rem',
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const MenuItem = ({ to, icon, label }: MenuItemProps) => (
    <Box component={RouterLink} to={to} sx={MenuItemStyle}>
      <Box 
        component="img" 
        src={icon} 
        alt={label} 
        sx={IconStyle}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          // Fallback caso a imagem não carregue
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
      <Typography sx={TextStyle}>{label}</Typography>
    </Box>
  );

  // Só mostra Gerenciamento quando:
  // 1. Não está carregando
  // 2. Não deu erro
  // 3. Usuário é admin
  const mostrarGerenciamento = !loading && !error && isAdmin;

  return (
    <Box sx={SidebarStyle}>
      <MenuItem to="/paginaInicial" icon={DashboardIcon} label="Dashboard" />
      <MenuItem to="/agenda" icon={AgendaIcon} label="Agenda" />
      <MenuItem to="/clientes" icon={ClientesIcon} label="Clientes" />
      <MenuItem to="/financeiro" icon={FinanceiroIcon} label="Financeiro" />
      
      {loading && (
        <Box sx={{ ...MenuItemStyle, justifyContent: 'center' }}>
          <CircularProgress size={20} sx={{ color: '#0053d9' }} />
        </Box>
      )}
      
      {mostrarGerenciamento && (
        <MenuItem to="/gerenciamento" icon={UsuariosIcon} label="Gerenciamento" />
      )}
      
      <MenuItem to="/suporte" icon={SuporteIcon} label="Suporte" />
    </Box>
  );
}
