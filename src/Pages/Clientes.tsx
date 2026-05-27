/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import { BsSearch } from 'react-icons/bs';

import BasicLayout from '../Layout/BasicLayout/BasicLayout';
import Breadcrumbs from '../Layout/Breadcrumbs/Clientes';

import AdicionarClienteModal from '../Layout/AdicionarClienteModal';
import EditarClienteModal from '../Layout/EditarClienteModal';
import VisualizarClienteModal from '../Layout/VisualizarClienteModal';

import api from '../services/api';

/* ================= TIPAGEM ================= */
type Cliente = {
  id: number;
  fullName: string;
  cpf?: string;
  dataNasc?: string;
  contato?: string;
  cidade?: string;
  estado?: string;
  logradouro?: string;
  numero?: string;
};

/* ================= HELPERS ================= */
function normalizeDate(date?: string) {
  if (!date) return '';
  return date.split('T')[0];
}

function formatDateBR(date?: string) {
  if (!date) return '';
  return date.split('-').reverse().join('/');
}

function formatarCPF(cpf?: string) {
  if (!cpf) return '';
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/* ================= COMPONENTE ================= */
export default function Clientes() {
  const [input, setInput] = useState('');
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [reload, setReload] = useState(false);

  // Atualiza a pesquisa quando reload mudar
  useEffect(() => {
    if (input.trim().length >= 3) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  async function handleSearch() {
    if (input.trim().length < 3) {
      setCliente(null);
      setNotFound(true);
      return;
    }

    try {
      const response = await api.get('/clientes');
      const lista: Cliente[] = response.data;

      const encontrado = lista.find(c =>
        c.fullName.toLowerCase().includes(input.toLowerCase())
      );

      if (!encontrado) {
        setCliente(null);
        setNotFound(true);
        return;
      }

      setCliente({
        ...encontrado,
        dataNasc: normalizeDate(encontrado.dataNasc),
      });
      setNotFound(false);
    } catch {
      setCliente(null);
      setNotFound(true);
    }
  }

  return (
    <BasicLayout>
      <Breadcrumbs />

      <Box sx={{ mt: 2 }}>
        {/* CARD BUSCA */}
        <Paper sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
          <Typography
            sx={{
              fontSize: { xs: 22, md: 28 },
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            Clientes
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
            <TextField
              label="Digite o nome do cliente"
              variant="standard"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <BsSearch />
            </Button>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <AdicionarClienteModal onAdd={() => setReload(prev => !prev)} />
          </Box>
        </Paper>

        {notFound && (
          <Typography sx={{ color: 'red', textAlign: 'center', mt: 3 }}>
            Cliente não encontrado.
          </Typography>
        )}

        {/* ================= BOX CLIENTE ================= */}
        {cliente && (
          <Paper
            sx={{
              mt: 4,
              maxWidth: 900,
              mx: 'auto',
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            {/* HEADER */}
            <Box sx={{ mb: 2 }}>
              <Typography fontSize={20} fontWeight={700}>
                {cliente.fullName}
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                CPF: {formatarCPF(cliente.cpf)}
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* DADOS */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="caption" color="text.secondary">
                  Data de Nascimento
                </Typography>
                <Typography fontWeight={500}>
                  {formatDateBR(cliente.dataNasc)}
                </Typography>
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography variant="caption" color="text.secondary">
                  Contato
                </Typography>
                <Typography fontWeight={500}>
                  {cliente.contato || '-'}
                </Typography>
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography variant="caption" color="text.secondary">
                  Cidade
                </Typography>
                <Typography fontWeight={500}>
                  {cliente.cidade || '-'}
                </Typography>
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography variant="caption" color="text.secondary">
                  Estado
                </Typography>
                <Typography fontWeight={500}>
                  {cliente.estado || '-'}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                  Endereço
                </Typography>
                <Typography fontWeight={500}>
                  {cliente.logradouro}, {cliente.numero}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* AÇÕES */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <VisualizarClienteModal cliente={cliente} />
              <EditarClienteModal
                cliente={cliente}  // Passando o objeto cliente completo
                onUpdate={() => setReload(prev => !prev)}
              />
            </Box>
          </Paper>
        )}
      </Box>
    </BasicLayout>
  );
}