/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  SelectChangeEvent,
} from '@mui/material';
import { IMaskInput } from 'react-imask';
import api from '../../services/api';

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

/* ================== ESTILOS ================== */

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

/* ================== DADOS FIXOS ================== */

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

type AdicionarClienteModalProps = {
  onAdd?: () => void;
};

/* ================== COMPONENTE ================== */

export default function AdicionarClienteModal({ onAdd }: AdicionarClienteModalProps) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const [form, setForm] = React.useState({
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

  const today = new Date().toISOString().split('T')[0];

  /* ===== BUSCAR ESTADOS ===== */
  React.useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
      .then((response) => {
        const sorted = [...response.data].sort((a: any, b: any) =>
          a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' })
        );
        setEstados(sorted);
      })
      .catch(() => setEstados([]));
  }, []);

  /* ===== BUSCAR CIDADES ===== */
  React.useEffect(() => {
    if (!selectedEstadoId) {
      setCidades([]);
      return;
    }
    axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedEstadoId}/municipios`)
      .then((response) => {
        const sorted = [...response.data].sort((a: any, b: any) =>
          a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' })
        );
        setCidades(sorted);
      })
      .catch(() => setCidades([]));
  }, [selectedEstadoId]);

  /* ===== HANDLERS ===== */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = async () => {
    if (!form.fullName || !form.cpf || !form.dataNasc || !form.sexo) {
      setError('Preencha os campos obrigatórios');
      return;
    }

    if (form.dataNasc > today) {
      setError('A data de nascimento não pode ser maior que hoje');
      return;
    }

    try {
      await api.post('/clientes', form);
      setSuccess(true);
      setOpen(false);
      setForm({
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
      setSelectedEstadoId('');
      setError(null);
    } catch {
      setError('Erro ao cadastrar cliente');
    }



  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#028be6',
          color: '#fff',
          fontWeight: 600,
          '&:hover': { backgroundColor: '#089bfc' },
        }}
      >
        Adicionar Cliente
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle} onKeyDown={handleKeyDown}>

          <Typography sx={{ fontSize: 22, fontWeight: 700, textAlign: 'center', mb: 3 }}>
            Ficha de Cadastro do Cliente
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* ===== DADOS PESSOAIS ===== */}
          <Typography sx={SectionTitle}>Dados Pessoais</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Nome Completo" name="fullName" fullWidth value={form.fullName} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="CPF" name="cpf" fullWidth value={form.cpf} onChange={handleChange} InputProps={{ inputComponent: CPFMask as any }} required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField type="date" label="Data de Nascimento" name="dataNasc" fullWidth InputLabelProps={{ shrink: true }} value={form.dataNasc} onChange={handleChange} required inputProps={{ max: today }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Sexo</InputLabel>
                <Select name="sexo" value={form.sexo} onChange={handleSelectChange}>
                  {sexos.map(s => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Estado Civil</InputLabel>
                <Select name="estadoCivil" value={form.estadoCivil} onChange={handleSelectChange}>
                  {estadosCivis.map(ec => <MenuItem key={ec.value} value={ec.value}>{ec.label}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* ===== CONTATO ===== */}
          <Typography sx={{ ...SectionTitle, mt: 4 }}>Contato</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="Contato" name="contato" fullWidth value={form.contato} onChange={handleChange} InputProps={{ inputComponent: PhoneMask as any }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Email" name="email" fullWidth value={form.email} onChange={handleChange} />
            </Grid>
          </Grid>

          {/* ===== ENDEREÇO ===== */}
          <Typography sx={{ ...SectionTitle, mt: 4 }}>Endereço</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  name="estado"
                  value={selectedEstadoId}
                  onChange={(e) => {
                    const id = e.target.value;
                    const estadoSelecionado = estados.find(est => est.id === id);
                    setSelectedEstadoId(id);
                    setForm(prev => ({ ...prev, estado: estadoSelecionado?.nome || '', cidade: '' }));
                  }}
                >
                  {estados.map(estado => <MenuItem key={estado.id} value={estado.id}>{estado.nome}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth disabled={!selectedEstadoId}>
                <InputLabel>Cidade</InputLabel>
                <Select
                  name="cidade"
                  value={cidades.some(c => c.nome === form.cidade) ? form.cidade : ''}
                  onChange={handleSelectChange}
                >
                  {cidades.map(cidade => <MenuItem key={cidade.id} value={cidade.nome}>{cidade.nome}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Bairro" name="bairro" fullWidth value={form.bairro} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField label="Logradouro" name="logradouro" fullWidth value={form.logradouro} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Número" name="numero" fullWidth value={form.numero} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Complemento" name="complemento" fullWidth value={form.complemento} onChange={handleChange} />
            </Grid>
          </Grid>

          {/* ===== AÇÕES ===== */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 1 }}>
            <Button onClick={() => setOpen(false)} sx={{ backgroundColor: '#EF4444', '&:hover': { backgroundColor: '#DC2626' }, color: '#fff', fontWeight: 600 }}>Cancelar</Button>
            <Button onClick={handleSubmit} sx={{ backgroundColor: '#4DEA80', '&:hover': { backgroundColor: '#3ca741' }, color: '#fff', fontWeight: 600 }}>Adicionar</Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setSuccess(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
          Cliente cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}