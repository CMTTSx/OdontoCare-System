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
  SelectChangeEvent,
  IconButton,
} from '@mui/material';
import { BsX } from 'react-icons/bs';
import { IMaskInput } from 'react-imask';
import { canPromoteToRole, RoleName } from '../../services/roles';

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
        onChange({ target: { name: 'telefone', value } })
      }
    />
  );
});

/* ================== INTERFACES ================== */

interface Usuario {
  id: number;
  nome: string;
  cargo: string;
  email: string;
  enabled: boolean;
  cpf?: string;
  telefone?: string;
  perfil?: string;
  role?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSalvar: (usuario: Usuario) => Promise<void>;
  userRole?: string; // ✅ Adicionado
}

/* ================== ESTILOS ================== */

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: 700 },
  maxHeight: '90vh',
  overflowY: 'auto' as const,
  bgcolor: '#fff',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const SectionTitle = {
  fontWeight: 600,
  fontSize: 16,
  color: '#0053d9',
  mb: 1,
};

/* ================== COMPONENTE ================== */

export default function AdicionarPerfilModal({ open, onClose, onSalvar, userRole = 'USER' }: Props) {

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const [form, setForm] = React.useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    perfil: '',
    role: 'USER',
  });

  // ✅ Filtra roles que o usuário atual pode definir
  const rolesDisponiveis = React.useMemo(() => {
    const todasRoles = [
      { value: 'USER', label: 'Usuário' },
      { value: 'ADMIN', label: 'Administrador' },
      { value: 'SUPER_ADMIN', label: 'Super Admin' },
    ];

    return todasRoles.filter(role => 
      canPromoteToRole(userRole, role.value as RoleName)
    );
  }, [userRole]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setForm({
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      perfil: '',
      role: 'USER',
    });

    setError(null);
    setLoading(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.cpf || !form.email || !form.perfil || !form.role) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    // ✅ Verifica permissão antes de salvar
    if (!canPromoteToRole(userRole, form.role as RoleName)) {
      setError('Você não tem permissão para definir esta autorização');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const novoUsuario: Usuario = {
        id: 0,
        nome: form.nome,
        cargo: form.perfil,
        email: form.email,
        enabled: true,
        cpf: form.cpf,
        telefone: form.telefone,
        perfil: form.perfil,
        role: form.role,
      };

      await onSalvar(novoUsuario);
      handleClose();

    } catch (err) {
      console.error(err);
      setError('Erro ao cadastrar usuário');
    } finally {
      setLoading(false);
    }
  };

  const getPerfilLabel = (perfil: string) => {
    switch (perfil) {
      case 'RECEPCIONISTA':
        return 'Recepcionista';
      case 'ODONTOLOGO':
        return 'Odontólogo';
      default:
        return perfil;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'Super Admin';
      case 'ADMIN':
        return 'Administrador';
      case 'USER':
        return 'Usuário';
      default:
        return role;
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography fontSize={24} fontWeight={700}>
            Cadastro de Usuário
          </Typography>

          <IconButton onClick={handleClose}>
            <BsX size={24} />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography sx={SectionTitle}>Dados do Usuário</Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nome Completo"
              name="nome"
              fullWidth
              required
              value={form.nome}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="CPF"
              name="cpf"
              fullWidth
              required
              value={form.cpf}
              onChange={handleChange}
              InputProps={{ inputComponent: CPFMask as any }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Telefone"
              name="telefone"
              fullWidth
              value={form.telefone}
              onChange={handleChange}
              InputProps={{ inputComponent: PhoneMask as any }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              required
              value={form.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Perfil do Usuário</InputLabel>
              <Select
                name="perfil"
                value={form.perfil}
                label="Perfil do Usuário"
                onChange={handleSelectChange}
              >
                <MenuItem value="RECEPCIONISTA">Recepcionista</MenuItem>
                <MenuItem value="ODONTOLOGO">Odontólogo</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Autorização</InputLabel>
              <Select
                name="role"
                value={form.role}
                label="Autorização"
                onChange={handleSelectChange}
              >
                {rolesDisponiveis.map(role => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {rolesDisponiveis.length <= 1 && (
              <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                Você só pode criar usuários com sua autorização atual ou inferior.
              </Typography>
            )}
          </Grid>
        </Grid>

        {form.perfil && (
          <Box sx={{ mt: 3, p: 2, bgcolor: '#f9fafb', borderRadius: 1 }}>
            <Typography variant="body2">
              <strong>Perfil:</strong> {getPerfilLabel(form.perfil)}
            </Typography>
            <Typography variant="body2">
              <strong>Autorização:</strong> {getRoleLabel(form.role)}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            variant="contained"
            sx={{
              backgroundColor: '#4DEA80',
              '&:hover': { backgroundColor: '#05e340' },
            }}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}