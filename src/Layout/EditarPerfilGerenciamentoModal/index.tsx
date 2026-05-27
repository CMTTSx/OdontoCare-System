/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

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
  Switch,
  FormControlLabel,
  Avatar,
  CircularProgress,
} from '@mui/material';

import { BsX, BsPerson } from 'react-icons/bs';

import { IMaskInput } from 'react-imask';

import api from '../../services/api';
import { canPromoteToRole, getPrimaryRoleName, normalizeRole, RoleName } from '../../services/roles';
import { normalizePerfil } from '../../services/perfis';

/* ================== MÁSCARAS ================== */

const CPFMask = React.forwardRef<HTMLInputElement, any>(
  function CPFMask(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="000.000.000-00"
        inputRef={ref}
        onAccept={(value: string) =>
          onChange({
            target: {
              name: 'cpf',
              value
            }
          })
        }
      />
    );
  }
);

const PhoneMask = React.forwardRef<HTMLInputElement, any>(
  function PhoneMask(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="(00) 00000-0000"
        inputRef={ref}
        onAccept={(value: string) =>
          onChange({
            target: {
              name: 'telefone',
              value
            }
          })
        }
      />
    );
  }
);

/* ================== TIPOS ================== */

export interface Usuario {
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

interface ApiUsuario {
  id: number;
  fullName?: string;
  nome?: string;
  cargo?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  telefone?: string;
  perfil?: string;
  role?: string | { name?: string };
  roles?: Array<{ name: string }>;
  enabled?: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  usuario: Usuario | null;
  onSalvar: (usuario: any) => Promise<void>;
  canPromoteToAdmin?: boolean;
  userRole?: string; // ✅ Adicionado
}

/* ================== ESTILO ================== */

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

/* ================== COMPONENTE ================== */

export default function EditarPerfilGerenciamentoModal({
  open,
  onClose,
  usuario,
  onSalvar,
  canPromoteToAdmin = false,
  userRole = 'USER', // ✅ Valor padrão
}: Props) {

  const [form, setForm] = useState<Usuario | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extrairRole = (data: ApiUsuario): RoleName => {
    const role = typeof data.role === 'object'
      ? data.role?.name
      : data.role;
    const roleNormalizada = normalizeRole(role || '');

    if (roleNormalizada) {
      return roleNormalizada;
    }

    return getPrimaryRoleName(data.roles);
  };

  // ✅ Roles disponíveis para edição
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

  /* ================== CARREGAR USUÁRIO ================== */

  useEffect(() => {
    if (!open) return;

    async function carregarUsuario() {
      if (!usuario?.id) {
        setError('ID do usuário inválido');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const token = sessionStorage.getItem('@airbnb-Token');

        if (!token) {
          setError('Token não encontrado');
          return;
        }

        const resp = await api.get(`/usuarios/${usuario.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data: ApiUsuario = resp.data;
        const perfil = normalizePerfil(data.perfil || '') || '';

        setForm({
          id: data.id,
          nome: data.fullName || data.nome || '',
          cargo: data.cargo || '',
          email: data.email || '',
          cpf: data.cpf || '',
          telefone: data.phone || data.telefone || '',
          perfil,
          role: extrairRole(data),
          enabled: data.enabled ?? true
        });

        setEnabled(data.enabled ?? true);

      } catch (err: any) {
        console.error('Erro ao carregar usuário:', err);

        if (err.response) {
          setError(
            `Erro ${err.response.status}: ${
              err.response.data?.message || 'Erro no servidor'
            }`
          );
        } else {
          setError('Erro de conexão com servidor');
        }
      } finally {
        setLoading(false);
      }
    }

    carregarUsuario();
  }, [open, usuario]);

  /* ================== HANDLERS ================== */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(e.target.checked);
  };

  const handleClose = () => {
    setForm(null);
    setEnabled(true);
    setError(null);
    setLoading(false);
    onClose();
  };

  /* ================== SUBMIT ================== */

  const handleSubmit = async () => {
    if (!form) {
      setError('Dados do formulário não carregados');
      return;
    }

    if (!form.nome.trim()) {
      setError('Nome é obrigatório');
      return;
    }

    if (!form.email.trim()) {
      setError('Email é obrigatório');
      return;
    }

    // ✅ Verifica permissão para alterar a role
    if (form.role && !canPromoteToRole(userRole, form.role as RoleName)) {
      setError('Você não tem permissão para definir esta autorização');
      return;
    }

    try {
      setLoading(true);

      const usuarioEditado = {
        id: form.id,
        nome: form.nome,
        email: form.email,
        cpf: form.cpf,
        telefone: form.telefone,
        perfil: normalizePerfil(form.perfil || '') || '',
        role: normalizeRole(form.role || '') || 'USER',
        enabled
      };

      await onSalvar(usuarioEditado);
      handleClose();

    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar usuário');
    } finally {
      setLoading(false);
    }
  };

  /* ================== LOADING ================== */

  if (!open) return null;

  if (loading && !form) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={200}
          >
            <CircularProgress />
          </Box>
        </Box>
      </Modal>
    );
  }

  if (!form) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Não foi possível carregar os dados do usuário
          </Alert>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={handleClose}>
              Fechar
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }

  /* ================== UI ================== */

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography fontSize={24} fontWeight={700}>
            Editar Usuário
          </Typography>

          <IconButton onClick={handleClose}>
            <BsX size={24}/>
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }}/>

        {error && (
          <Alert severity="error" sx={{ mb:2 }}>
            {error}
          </Alert>
        )}

        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar
            sx={{
              width:80,
              height:80,
              bgcolor: enabled ? "#0053d9" : "#9e9e9e"
            }}
          >
            <BsPerson size={40}/>
          </Avatar>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="CPF"
              name="cpf"
              value={form.cpf || ''}
              onChange={handleChange}
              fullWidth
              InputProps={{
                inputComponent: CPFMask as any
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Telefone"
              name="telefone"
              value={form.telefone || ''}
              onChange={handleChange}
              fullWidth
              InputProps={{
                inputComponent: PhoneMask as any
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Perfil</InputLabel>
              <Select
                name="perfil"
                value={form.perfil || ''}
                label="Perfil"
                onChange={handleSelectChange}
              >
                <MenuItem value="RECEPCIONISTA">
                  Recepcionista
                </MenuItem>
                <MenuItem value="ODONTOLOGO">
                  Odontólogo
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Autorização</InputLabel>
              <Select
                name="role"
                value={form.role || 'USER'}
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
                Você não pode alterar a autorização deste usuário.
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={enabled}
                  onChange={handleStatusChange}
                />
              }
              label={
                enabled
                  ? 'Usuário Ativo'
                  : 'Usuário Inativo'
              }
            />
          </Grid>
        </Grid>

        <Box
          mt={4}
          display="flex"
          justifyContent="flex-end"
          gap={2}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ backgroundColor:"#0053d9" }}
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
