import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import AdicionarPerfilModal from '../Layout/AdicionarPerfilModal';
import Breadcrumbs from '../Layout/Breadcrumbs/Gerenciamento';
import GerenciamentoPopover from '../Layout/GerenciamentoPopover';
import Navbar from '../Layout/Navbar';
import Sidebar from '../Layout/Sidebar';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const ContentConfig = {
  overflowX: 'hidden',

  '@media (min-width: 320px) ': {
    ml: 3.8,
    width: '83%',
  },
  '@media (min-width: 1024px) ': {
    ml: 5,
  },
  '@media (min-width: 1440px) ': {
    width: '85%',
    ml: 5,
  },

}

const TypoGerenciamento = {
  fontSize: 35,
  color: '#000000',
  mt: 10,
  ml: 'auto',
  mr: 'auto',
  fontWeight: 600,

  '@media (min-width: 320px) ': {
    fontSize: 25,
    mt: 2,
  },
  '@media (min-width: 1024px) ': {
    fontSize: 35,
  },

}

// tab
const BoxConfig = {
  border: 1,
  ml: 'auto',
  mr: 'auto',
  mt: 4,
  mb: 1,
  width: '20rem',
  height: '3em',

  '@media (min-width: 320px) ': {
    ml: 2,
    width: '90%',
  },
  '@media (min-width: 1023px) ': {
    width: '60%',
    ml: 'auto',
    mr: 'auto',
  },
  '@media (min-width: 2560px) ': {
    width: '35%',
    ml: 'auto',
    mr: 'auto',
  },

}

const TypoProfile = {
  textAlign: 'start',
  pl: 2,
  mt: 0.5,
  fontSize: 15,
  fontWeight: 600,
  color: '#000000',
}

const TypoName = {
  textAlign: 'start',
  color: '#000000',
  pl: 2.5,
  mt: -0.6,
  fontSize: 14,
}

const PopoverConfig = {

  '@media (min-width: 320px) ': {
    ml: -81,
    mt: 0.3,
  },
  '@media (min-width: 375px) ': {
    ml: -76,
  },
  '@media (min-width: 768px) ': {
    ml: -48,
  },
  '@media (min-width: 1024px) ': {
    ml: -52,
  },
  '@media (min-width: 1440px) ': {
    ml: 20
  },
  '@media (min-width: 3440px) ': {
    ml: 0,
  }

}

export default function Gerenciamento() {
  return (
    <Box sx={{ backgroundColor: '#F6F4F4', height: '100rem' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={20}>
          <Navbar />
          <Breadcrumbs />
        </Grid>
        <Grid item xs={1} sx={{ zIndex: 1000, }}>
        <Sidebar />
        </Grid>
        <Grid item xs={11}>
          <Item sx={ContentConfig}>

            <Typography sx={TypoGerenciamento}>Gerenciamento de Usuários</Typography>

            <Box sx={BoxConfig}>
              <Typography sx={TypoProfile}>Administrador(a)</Typography>

              <Typography sx={TypoName}>Fabíola T. Reis</Typography>

              <Box sx={PopoverConfig}><GerenciamentoPopover /></Box>
            </Box>
            <Button><AdicionarPerfilModal /></Button>
          </Item>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', color: 'red', fontStyle: 'bold', width: 1, pt: 10, }}>
          VERSÃO DEMONSTRATIVA
      </Box>
    </Box>
  );
}
