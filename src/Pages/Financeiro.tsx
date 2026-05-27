import React from 'react';

import {
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';

import BasicLayout from '../Layout/BasicLayout/BasicLayout';
import Breadcrumbs from '../Layout/Breadcrumbs/Financeiro';

import Boleto from '../../src/assets/Boleto.webp';
import nfe from '../../src/assets/icon-nfe.png';
import EntradaSaida from '../assets/entradaSaida.png';

export default function Financeiro() {
  return (
    <BasicLayout>
      {/* Breadcrumbs */}
      <Breadcrumbs />

      <Box sx={{ mt: 2 }}>
        {/* CARD CENTRAL */}
        <Paper
          sx={{
            p: 4,
            maxWidth: 900,
            mx: 'auto',
            textAlign: 'center',
            width: {
              xs: '40%',
              sm: '100%',
              md: '100%',
              lg: '100%',
            },
            ml: {
              xs: 0,
              sm: 'auto',
            },
            mr: 'auto',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 24, md: 32 },
              fontWeight: 600,
              mb: 4,
            }}
          >
            Financeiro
          </Typography>

          {/* BOTÕES */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            <Button
              disabled
              sx={{
                width: 250,
                height: 100,
                border: '1px solid #ccc',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <img src={EntradaSaida} alt="Entradas e Saídas" width={60} />
              <Typography>Entradas e Saídas</Typography>
            </Button>

            <Button
              disabled
              sx={{
                width: 250,
                height: 100,
                border: '1px solid #ccc',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <img src={Boleto} alt="Boleto" width={60} />
              <Typography>Emissão de Boleto</Typography>
            </Button>

            <Button
              disabled
              sx={{
                width: 250,
                height: 100,
                border: '1px solid #ccc',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <img src={nfe} alt="NFe" width={60} />
              <Typography>Nota Fiscal Eletrônica</Typography>
            </Button>
          </Box>
        </Paper>
      </Box>
    </BasicLayout>
  );
}
