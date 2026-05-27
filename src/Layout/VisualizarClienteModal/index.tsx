/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import api from '../../services/api';

/* ================== TIPOS ================== */

export type Cliente = {
  id?: number;
  fullName?: string;
  cpf?: string;
  dataNasc?: string;
  sexo?: string;
  estadoCivil?: string;
  contato?: string;
  email?: string;
  estado?: string;
  cidade?: string;
  bairro?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
};

type Props = {
  cliente: Cliente;
};

/* ================== CONSTANTES ================== */

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxWidth: 950,
  bgcolor: '#fff',
  borderRadius: 1,
  boxShadow: 3,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

const SectionTitle = {
  fontWeight: 600,
  fontSize: 16,
  color: '#0053d9',
  mb: 1,
};

const estadosCivis = [
  { value: 'SOLTEIRO', label: 'Solteiro(a)' },
  { value: 'CASADO', label: 'Casado(a)' },
  { value: 'DIVORCIADO', label: 'Divorciado(a)' },
  { value: 'VIUVO', label: 'Viúvo(a)' },
  { value: 'SEPARADO', label: 'Separado(a)' },
  { value: 'UNIAO_ESTAVEL', label: 'União Estável' },
];

const sexos = [
  { value: 'MASCULINO', label: 'Masculino' },
  { value: 'FEMININO', label: 'Feminino' },
  { value: 'OUTRO', label: 'Outro' },
];

/* ================== HELPERS ================== */

function normalizeDate(date?: string) {
  if (!date) return '';
  return date.split('T')[0];
}

function formatDateBR(date?: string) {
  if (!date) return '';
  return date.split('-').reverse().join('/');
}

/* ================== COMPONENTE ================== */

export default function VisualizarClienteModal({ cliente }: Props) {

  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<Cliente | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  /* ================== CARREGAR CLIENTE ================== */

  React.useEffect(() => {

    if (!open || !cliente?.id) return;

    async function carregarCliente() {

      try {

        const resp = await api.get(`/clientes/${cliente.id}`);

        const data = resp.data;

        setForm({
          id: data.id,
          fullName: data.fullName,
          cpf: data.cpf,
          dataNasc: normalizeDate(data.dataNasc),
          sexo: data.sexo,
          estadoCivil: data.estadoCivil,
          contato: data.contato,
          email: data.email,
          estado: data.estado,
          cidade: data.cidade,
          bairro: data.bairro,
          logradouro: data.logradouro,
          numero: data.numero,
          complemento: data.complemento,
        });

      } catch (err) {

        console.error(err);
        setError('Erro ao carregar dados do cliente');

      }

    }

    carregarCliente();

  }, [open, cliente]);

  /* ================== ABRIR MODAL ================== */

  const handleOpen = () => {
    setError(null);
    setForm(null);
    setOpen(true);
  };

  /* ================== COMPONENTE ================== */

  return (
    <>
      <Button sx={{ backgroundColor: '#1a73c2', color: '#fff', '&:hover': { backgroundColor: '#1565C0' }, fontWeight: 600 }} onClick={handleOpen}>
        Visualizar
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>

        <Box sx={modalStyle}>

          <Typography
            sx={{ fontSize: 22, fontWeight: 700, mb: 3, textAlign: 'center' }}
          >
            Ficha de Cadastro do Cliente
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          {form && (
            <>
              {/* ================= DADOS PESSOAIS ================= */}

              <Typography sx={SectionTitle}>Dados Pessoais</Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <TextField
                    label="Nome Completo"
                    value={form.fullName || ''}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="CPF"
                    value={form.cpf || ''}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Data de Nascimento"
                    value={formatDateBR(form.dataNasc)}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>


                    <TextField
                      value={form.sexo || ''}
                      fullWidth
                      InputProps={{ readOnly: true }}
                      disabled
                    />

                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>


                    <TextField
                      label="Estado Civil"
                      value={form.estadoCivil || ''}
                      fullWidth
                      InputProps={{ readOnly: true }}
                      disabled
                    />

                  </FormControl>
                </Grid>

              </Grid>

              {/* ================= CONTATO ================= */}

              <Typography sx={{ ...SectionTitle, mt: 4 }}>
                Contato
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Contato"
                    value={form.contato || ''}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    value={form.email || ''}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>

              </Grid>

              {/* ================= ENDEREÇO ================= */}

              <Typography sx={{ ...SectionTitle, mt: 4 }}>
                Endereço
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Estado"
                    value={form.estado || ''}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Cidade"
                    value={form.cidade || ''}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Bairro"
                    value={form.bairro || ''}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} md={8}>
                  <TextField
                    label="Logradouro"
                    value={form.logradouro || ''}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Número"
                    value={form.numero || ''}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Complemento"
                    value={form.complemento || ''}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>

              </Grid>
            </>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button sx={{ backgroundColor: '#EF4444', color: '#fff', '&:hover': { backgroundColor: '#DC2626' }, fontWeight: 600 }} onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </Box>

        </Box>

      </Modal>
    </>
  );
}