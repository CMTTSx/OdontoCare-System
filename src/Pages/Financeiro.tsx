import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

import Navbar from '../Layout/Navbar';
import Breadcrumbs from '../Layout/Breadcrumbs/Financeiro';
import Sidebar from '../Layout/Sidebar';

import EntradaSaida from '../assets/entradaSaida.png'
import Boleto from '../../src/assets/Boleto.webp'
import nfe from '../../src/assets/icon-nfe.png';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const NavbarConfig = {
  borderRadius: 0,
  p: 0,
  overflow: 'hidden',
  display: 'flex',
  bgcolor: '#000744',
  mt: -1,
  ml: -1,
  pr: 2,
  width: '100%',
}

const SidebarConfig = {
  mt: -1,
  ml: -1,
  backgroundColor: 'transparent',
  textAlign: 'inherit',
  p: 0,
  color: 'transparent',
  boxShadow: 0,
  width: '66%',
}

const ContentConfig = {

  '@media (min-width: 320px) ': {
    ml: 3.8,
    width: '83%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  '@media (min-width: 599px) ': {
    ml: 4,
    width: '82%',
    overflowX: 'hidden',
  },
  '@media (min-width: 992px) ': {
    ml: 5.3,
    overflowX: 'hidden',
  },
  '@media (min-width: 1024px) ': {
    ml: 19,
    overflowX: 'hidden',
  },
  '@media (min-width: 1440px) ': {
    width: '85%',
    ml: 13,
  },

}

const TypoFinanceiro = {
  fontSize: 35,
  color: '#000000',
  fontWeight: 600,
  mt: 5,
  ml: 'auto',
  mr: 'auto',
}

const BoxConfig = {
  mt: 10,
  ml: 0,
  mb: 10,

}

const EntradaSaidaIMG = {
  width: '20%',
  ml: 5,
  mt: -3,

  
}

const TypoEntradaSaida = {
  ml: -11,
  mt: 7,
  
}

const boletoIMG = {
  ml: 8,
  mt: -3,

}

const TypoBoleto = {
  ml: -14,
  mt: 7,

}


const ButtonConfig = {
  border: 1,
  width: 250,
  height: 100,
  m: 2,
  cursor: 'pointer',

  '@media (min-width: 320px) ': {
    width: '90%',
  },
  '@media (min-width: 600px) ': {
    width: 250,
    height: 100,
    ml: 0,
  },
  '@media (min-width: 800px) ': {
    width: 250,
    height: 100,
  },

}



export default function Financeiro() {
  return (
    <Box sx={{ backgroundColor: '#F6F4F4' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={20}>
          <Item sx={NavbarConfig}><Navbar /></Item>
          <Breadcrumbs />
        </Grid>
        <Grid item xs={1} sx={{ zIndex: 1000, }}>
          <Item sx={SidebarConfig}><Sidebar /></Item>
        </Grid>
        <Grid item xs={11}>
          <Item sx={ContentConfig}>

            <Typography sx={TypoFinanceiro}>Financeiro</Typography>

            <Box sx={BoxConfig} >
              <Button disabled={true} sx={ButtonConfig} >
                <Box sx={EntradaSaidaIMG}><img src={EntradaSaida} alt="" /></Box>
                <Typography sx={TypoEntradaSaida}>Entradas e Saídas</Typography>
              </Button>
              <Button disabled={true} sx={ButtonConfig} >
                <Box sx={boletoIMG}><img src={Boleto} alt="" style={{ width: '5em', marginLeft: '-0.2em', }} /></Box>
                <Typography sx={TypoBoleto}>Emissão de Boleto</Typography>
              </Button>
              <Button disabled={true} sx={ButtonConfig} >
                <Box><img src={nfe} alt="" style={{ width: '5em', }} /></Box>
                <Typography>Nota Fiscal Eletrônica</Typography>
              </Button>
            </Box>


          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
