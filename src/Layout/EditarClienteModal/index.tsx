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
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { IMaskInput } from 'react-imask';
import api from '../../services/api';
import axios from 'axios';

/* ================== MÁSCARAS ================== */
const CPFMask = React.forwardRef<HTMLInputElement, any>(function CPFMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000.000.000-00"
      inputRef={ref}
      onAccept={(value: string) =>
        onChange({ target: { name: 'cpf', value } })
      }
    />
  );
});

const PhoneMask = React.forwardRef<HTMLInputElement, any>(function PhoneMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00) 00000-0000"
      inputRef={ref}
      onAccept={(value: string) =>
        onChange({ target: { name: 'contato', value } })
      }
    />
  );
});

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
  onUpdate?: () => void;
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

/* ================== COMPONENTE ================== */
export default function EditarClienteModal({ cliente, onUpdate }: Props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [form, setForm] = React.useState<Cliente>({
    id: cliente?.id,
    fullName: '',
    cpf: '',
    dataNasc: '',
    sexo: '',
    estadoCivil: '',
    contato: '',
    email: '',
    estado: '',
    cidade: '',
    bairro: '',
    logradouro: '',
    numero: '',
    complemento: '',
  });

  const [estados, setEstados] = React.useState<any[]>([]);
  const [cidades, setCidades] = React.useState<any[]>([]);
  const [selectedEstadoId, setSelectedEstadoId] = React.useState<string>('');

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  /* ===== BUSCAR ESTADOS ===== */
  React.useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
      .then(res =>
        setEstados(res.data.sort((a: any, b: any) => a.nome.localeCompare(b.nome)))
      )
      .catch(() => setEstados([]));
  }, []);

  /* ===== BUSCAR CIDADES ===== */
  React.useEffect(() => {
    if (!selectedEstadoId) {
      setCidades([]);
      return;
    }

    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedEstadoId}/municipios`)
      .then(res =>
        setCidades(res.data.sort((a: any, b: any) => a.nome.localeCompare(b.nome)))
      )
      .catch(() => setCidades([]));
  }, [selectedEstadoId]);

  /* ===== BUSCAR CIDADES QUANDO ESTADO FOR SELECIONADO ===== */
  React.useEffect(() => {
    if (form.estado && estados.length > 0) {
      const estadoEncontrado = estados.find(e => e.nome === form.estado);
      if (estadoEncontrado) {
        setSelectedEstadoId(String(estadoEncontrado.id));
      }
    }
  }, [form.estado, estados]);

  /* ===== ABRIR MODAL E CARREGAR DADOS ===== */
  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);
    setError(null);

    try {
      console.log('Buscando cliente ID:', cliente.id);
      const resp = await api.get(`/clientes/${cliente.id}`);
      console.log('Dados recebidos da API:', resp.data);

      const data = resp.data;

      // Mapear os dados corretamente
      const dadosFormatados = {
        id: data.id,
        fullName: data.fullName || '',
        cpf: data.cpf || '',
        dataNasc: data.dataNasc ? data.dataNasc.split('T')[0] : '',
        sexo: data.sexo || '',
        estadoCivil: data.estadoCivil || '',
        contato: data.contato || '',
        email: data.email || '',
        estado: data.estado || '',
        cidade: data.cidade || '',
        bairro: data.bairro || '',
        logradouro: data.logradouro || '',
        numero: data.numero || '',
        complemento: data.complemento || '',
      };

      console.log('Dados formatados:', dadosFormatados);
      setForm(dadosFormatados);

    } catch (err) {
      console.error('Erro ao carregar cliente:', err);
      setError('Erro ao carregar dados do cliente');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /* ===== SALVAR ALTERAÇÕES ===== */
  const handleSave = async () => {
    // Validar campos obrigatórios
    if (!form.fullName?.trim()) {
      setError('Nome completo é obrigatório');
      return;
    }
    if (!form.cpf?.trim()) {
      setError('CPF é obrigatório');
      return;
    }
    if (!form.dataNasc) {
      setError('Data de nascimento é obrigatória');
      return;
    }
    if (!form.sexo) {
      setError('Sexo é obrigatório');
      return;
    }
    if (!form.estadoCivil) {
      setError('Estado civil é obrigatório');
      return;
    }
    if (!form.contato?.trim()) {
      setError('Contato é obrigatório');
      return;
    }
    if (!form.email?.trim()) {
      setError('Email é obrigatório');
      return;
    }
    if (!form.logradouro?.trim()) {
      setError('Logradouro é obrigatório');
      return;
    }
    if (!form.bairro?.trim()) {
      setError('Bairro é obrigatório');
      return;
    }
    if (!form.numero?.trim()) {
      setError('Número é obrigatório');
      return;
    }
    if (!form.estado) {
      setError('Estado é obrigatório');
      return;
    }
    if (!form.cidade) {
      setError('Cidade é obrigatória');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Preparar payload removendo máscaras
      const payload = {
        fullName: form.fullName.trim(),
        cpf: form.cpf.replace(/[^\d]/g, ''),
        dataNasc: form.dataNasc,
        sexo: form.sexo,
        estadoCivil: form.estadoCivil,
        contato: form.contato.replace(/[^\d]/g, ''),
        email: form.email.trim(),
        logradouro: form.logradouro.trim(),
        bairro: form.bairro.trim(),
        numero: form.numero.trim(),
        complemento: form.complemento?.trim() || '',
        estado: form.estado,
        cidade: form.cidade,
      };

      console.log('Enviando dados para API:', payload);
      await api.put(`/clientes/${cliente.id}`, payload);

      setSnackbar({
        open: true,
        message: 'Alterações salvas com sucesso!',
        severity: 'success'
      });

      onUpdate?.();
      setTimeout(handleClose, 1500);

    } catch (err: any) {
      console.error('Erro ao salvar:', err);
      const errorMessage = err.response?.data?.message || 'Erro ao salvar alterações';
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Editar
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography sx={{ fontSize: 22, fontWeight: 700, mb: 3, textAlign: 'center' }}>
            Editar Cadastro do Cliente
          </Typography>

          {loading && (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          )}

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {!loading && form && (
            <>
              {/* ================= DADOS PESSOAIS ================= */}
              <Typography sx={SectionTitle}>Dados Pessoais</Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Nome Completo"
                    name="fullName"
                    value={form.fullName || ''}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="CPF"
                    name="cpf"
                    value={form.cpf || ''}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{ inputComponent: CPFMask as any }}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    type="date"
                    label="Data de Nascimento"
                    name="dataNasc"
                    value={form.dataNasc || ''}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth required>
                    <InputLabel>Sexo</InputLabel>
                    <Select
                      name="sexo"
                      value={form.sexo || ''}
                      label="Sexo"
                      onChange={handleSelectChange}
                    >
                      {sexos.map(s => (
                        <MenuItem key={s.value} value={s.value}>
                          {s.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth required>
                    <InputLabel>Estado Civil</InputLabel>
                    <Select
                      name="estadoCivil"
                      value={form.estadoCivil || ''}
                      label="Estado Civil"
                      onChange={handleSelectChange}
                    >
                      {estadosCivis.map(ec => (
                        <MenuItem key={ec.value} value={ec.value}>
                          {ec.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* ================= CONTATO ================= */}
              <Typography sx={{ ...SectionTitle, mt: 4 }}>Contato</Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Contato"
                    name="contato"
                    value={form.contato || ''}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{ inputComponent: PhoneMask as any }}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={form.email || ''}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

              {/* ================= ENDEREÇO ================= */}
              <Typography sx={{ ...SectionTitle, mt: 4 }}>Endereço</Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth required>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={selectedEstadoId}
                      label="Estado"
                      onChange={(e) => {
                        const id = String(e.target.value);
                        const est = estados.find(e => String(e.id) === id);
                        setSelectedEstadoId(id);
                        setForm(prev => ({
                          ...prev,
                          estado: est?.nome || '',
                          cidade: '' // Limpa a cidade quando muda o estado
                        }));
                      }}
                    >
                      {estados.map(e => (
                        <MenuItem key={e.id} value={String(e.id)}>
                          {e.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth required disabled={!selectedEstadoId}>
                    <InputLabel>Cidade</InputLabel>
                    <Select
                      value={form.cidade || ''}
                      label="Cidade"
                      onChange={(e) =>
                        setForm(prev => ({
                          ...prev,
                          cidade: e.target.value
                        }))
                      }
                    >
                      {cidades.map(c => (
                        <MenuItem key={c.id} value={c.nome}>
                          {c.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Bairro"
                    name="bairro"
                    value={form.bairro || ''}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} md={8}>
                  <TextField
                    label="Logradouro"
                    name="logradouro"
                    value={form.logradouro || ''}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Número"
                    name="numero"
                    value={form.numero || ''}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Complemento"
                    name="complemento"
                    value={form.complemento || ''}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{
                    backgroundColor: '#EF4444',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#DC2626' },
                    fontWeight: 600
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  sx={{
                    backgroundColor: '#4DEA80',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#45A049' },
                    fontWeight: 600
                  }}
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}