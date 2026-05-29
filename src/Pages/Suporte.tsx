import React from 'react';

import {
  Box,
  Paper,
  Typography,
  Divider,
} from '@mui/material';

import BasicLayout from '../Layout/BasicLayout/BasicLayout';
import Breadcrumbs from '../Layout/Breadcrumbs/Suporte';
import DemoNotice from '../Layout/DemoNotice';

import AdicionarNovoTicketModal from '../Layout/AdicionarNovoTicketModal';
import VerificarNovoTicketModal from '../Layout/VerificarNovoTicketModal';

export default function Suporte() {
  return (
    <BasicLayout>
      <Breadcrumbs />
      <DemoNotice />

      <Box sx={{ mt: 3 }}>
        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            maxWidth: 1000,
            mx: 'auto',
            borderRadius: 2,
          }}
        >
          {/* TÍTULO */}
          <Typography
            sx={{
              fontSize: { xs: 22, md: 30 },
              fontWeight: 600,
              textAlign: 'center',
              mb: 2,
            }}
          >
            Centro de Suporte
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* TEXTO */}
          <Typography
            sx={{
              textAlign: 'justify',
              mb: 5,
              color: 'text.secondary',
              fontSize: 15,
            }}
          >
            Para otimizar solicitações de suporte e atendê-lo melhor, utilizamos
            um sistema de tíquetes. Cada solicitação recebe um número exclusivo
            para acompanhamento. Você pode consultar o histórico completo das
            suas solicitações a qualquer momento.
          </Typography>

          {/* AÇÕES */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              alignItems: 'stretch',
            }}
          >
            {/* NOVO TICKET */}
            <Paper
              variant="outlined"
              sx={{
                p: 4,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center',
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 18,
                    mb: 2,
                  }}
                >
                  Abrir novo ticket
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    color: 'text.secondary',
                    mb: 3,
                  }}
                >
                  Descreva seu problema ou solicitação com o máximo de detalhes
                  possível.
                </Typography>
              </Box>

              <AdicionarNovoTicketModal />
            </Paper>

            {/* VERIFICAR TICKET */}
            <Paper
              variant="outlined"
              sx={{
                p: 4,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center',
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 18,
                    mb: 2,
                  }}
                >
                  Consultar tickets
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    color: 'text.secondary',
                    mb: 3,
                  }}
                >
                  Acompanhe o status e as respostas dos tickets já enviados.
                </Typography>
              </Box>

              <VerificarNovoTicketModal />
            </Paper>
          </Box>
        </Paper>
      </Box>
    </BasicLayout>
  );
}
