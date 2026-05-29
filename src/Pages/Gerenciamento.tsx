import React, { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Button,
  Paper,
  Typography,
  Popover,
  Alert,
  Snackbar,
  Divider,
  Avatar,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material';

import { BsThreeDotsVertical, BsPerson, BsPersonBadge } from 'react-icons/bs';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import BasicLayout from '../Layout/BasicLayout/BasicLayout';
import Breadcrumbs from '../Layout/Breadcrumbs/Gerenciamento';
import DemoNotice from '../Layout/DemoNotice';
import AdicionarPerfilModal from '../Layout/AdicionarPerfilModal';
import EditarPerfilModal from '../Layout/EditarPerfilGerenciamentoModal';
import ConfirmarDeleteModal from '../Layout/ConfirmarDeleteModal';

import api from '../services/api';
import { getPrimaryRoleName, getRoleLabel, isAdminRole, isSuperAdminRole, canPromoteToRole, normalizeRole } from '../services/roles';
import { getPerfilLabel, normalizePerfil } from '../services/perfis';
import { getUserRole } from '../services/permissions';

import type { Usuario } from '../Layout/EditarPerfilGerenciamentoModal';

/* ================= INTERFACE ================= */

interface ApiUsuario {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  cpf?: string;
  enabled: boolean;
  perfil?: string;
  role?: {
    id: number;
    name: string;
  } | string;
  roles?: Array<{ name: string }>;
}

/* ================= UTILITÁRIO ================= */

const extrairValorString = (valor: any): string => {
  if (!valor) return '';

  if (typeof valor === 'string') {
    return valor;
  }

  if (typeof valor === 'object' && valor !== null) {
    return valor.name || valor.role || valor.perfil || '';
  }

  return String(valor);
};

const extrairRoleUsuario = (usuario: Pick<ApiUsuario, 'role' | 'roles'> | Usuario): string => {
  const roleDireta = extrairValorString((usuario as ApiUsuario).role).trim().toUpperCase();
  const roleNormalizada = normalizeRole(roleDireta);

  if (roleNormalizada) {
    return roleNormalizada;
  }

  const roles = (usuario as ApiUsuario).roles;
  if (Array.isArray(roles) && roles.length > 0) {
    return getPrimaryRoleName(roles);
  }

  return 'USER';
};

const normalizarCpf = (cpf?: string): string => {
  return extrairValorString(cpf).replace(/\D/g, '');
};

const normalizarTelefone = (telefone?: string): string => {
  return extrairValorString(telefone).replace(/\D/g, '');
};

const mapearUsuarioApi = (user: ApiUsuario): Usuario => {
  const perfil = normalizePerfil(extrairValorString(user.perfil)) || '';

  return {
    id: user.id,
    nome: user.fullName,
    email: user.email,
    cpf: user.cpf || '',
    telefone: user.phone || '',
    enabled: user.enabled,
    perfil,
    role: extrairRoleUsuario(user),
    cargo: getPerfilLabel(perfil)
  };
};

const normalizarUsuarioLocal = (usuario: Usuario): Usuario => {
  const perfil = normalizePerfil(extrairValorString(usuario.perfil)) || '';
  const role = extrairRoleUsuario(usuario);

  return {
    ...usuario,
    perfil,
    role,
    cargo: getPerfilLabel(perfil),
  };
};

const prepararDadosUsuario = (usuario: Usuario): Record<string, any> => {
  const dados: Record<string, any> = {};

  const fullName = extrairValorString(usuario.nome).trim();
  if (fullName) dados.fullName = fullName;

  const email = extrairValorString(usuario.email).trim();
  if (email) dados.email = email;

  const cpf = normalizarCpf(usuario.cpf);
  if (cpf) dados.cpf = cpf;

  const telefone = normalizarTelefone(usuario.telefone);
  if (telefone) dados.phone = telefone;

  const perfil = normalizePerfil(extrairValorString(usuario.perfil));
  if (perfil) dados.perfil = perfil;

  const role = normalizeRole(extrairValorString(usuario.role));
  if (role) dados.role = role;

  if (usuario.enabled !== undefined && usuario.enabled !== null) {
    dados.enabled = usuario.enabled;
  }

  return dados;
};

/* ================= POPOVER ================= */

interface GerenciamentoPopoverProps {
  usuario: Usuario;
  onEditar: (usuario: Usuario) => void;
  onDeletar: (usuario: Usuario) => void;
  podeEditar: boolean;
  podeDeletar: boolean;
}

function GerenciamentoPopover({ usuario, onEditar, onDeletar, podeEditar, podeDeletar }: GerenciamentoPopoverProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditar = () => {
    if (podeEditar) {
      onEditar(usuario);
      handleClose();
    }
  };

  const handleDeletar = () => {
    if (podeDeletar) {
      onDeletar(usuario);
      handleClose();
    }
  };

  const temAcoes = podeEditar || podeDeletar;

  if (!temAcoes) {
    return null;
  }

  return (
    <>
      <IconButton onClick={handleClick} size="small" aria-label="opções do usuário">
        <BsThreeDotsVertical />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ minWidth: 200 }}>
          {podeEditar && (
            <Button
              fullWidth
              startIcon={<FiEdit2 />}
              onClick={handleEditar}
              sx={{ justifyContent: 'flex-start', px: 2, py: 1 }}
            >
              Editar Usuário
            </Button>
          )}

          {podeEditar && podeDeletar && <Divider />}

          {podeDeletar && (
            <Button
              fullWidth
              startIcon={<FiTrash2 />}
              onClick={handleDeletar}
              color="error"
              sx={{ justifyContent: 'flex-start', px: 2, py: 1 }}
            >
              Deletar Usuário
            </Button>
          )}
        </Box>
      </Popover>
    </>
  );
}

/* ================= COMPONENT PRINCIPAL ================= */

export default function Gerenciamento() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [userRole, setUserRole] = useState<string>('USER');
  const [canPromoteToAdmin, setCanPromoteToAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [editarOpen, setEditarOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [adicionarOpen, setAdicionarOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  /* ================= SNACKBAR ================= */

  const showSnackbar = useCallback((message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleSnackbarClose = useCallback((_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  }, []);

  /* ================= AUTORIZAÇÃO ================= */

  const podeEditarUsuario = useCallback((usuarioAlvo: Usuario): boolean => {
    if (isSuperAdminRole(userRole)) return true;
    if (isAdminRole(userRole)) {
      return usuarioAlvo.role !== 'SUPER_ADMIN';
    }
    return false;
  }, [userRole]);

  const podeDeletarUsuario = useCallback((usuarioAlvo: Usuario): boolean => {
    if (isSuperAdminRole(userRole)) return true;
    if (isAdminRole(userRole)) {
      return usuarioAlvo.role !== 'SUPER_ADMIN' && usuarioAlvo.role !== 'ADMIN';
    }
    return false;
  }, [userRole]);

  const podeCriarUsuario = useCallback((): boolean => {
    return isAdminRole(userRole);
  }, [userRole]);

  /* ================= BUSCAR USUÁRIOS ================= */

  const buscarUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = sessionStorage.getItem('@airbnb-Token');
      if (!token) throw new Error('Token não encontrado');

      const response = await api.get<ApiUsuario[]>('/usuarios', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const dados: Usuario[] = response.data.map(mapearUsuarioApi);

      setUsuarios(dados);
    } catch (err) {
      setError('Erro ao carregar usuários. Tente novamente mais tarde.');
      showSnackbar('Erro ao carregar usuários', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  /* ================= CARREGAR DADOS INICIAIS ================= */

  useEffect(() => {
    buscarUsuarios();
  }, [buscarUsuarios]);

  useEffect(() => {
    async function carregarUsuarioLogado() {
      try {
        const role = await getUserRole();
        setUserRole(role);
        setCanPromoteToAdmin(isAdminRole(role));
      } catch (err) {
        setUserRole('USER');
        setCanPromoteToAdmin(false);
      }
    }

    carregarUsuarioLogado();
  }, []);

  /* ================= ADICIONAR USUÁRIO ================= */

  const handleSalvarNovo = async (usuario: Usuario): Promise<void> => {
    try {
      if (!podeCriarUsuario()) {
        showSnackbar('Você não tem permissão para criar usuários', 'error');
        return;
      }

      if (usuario.role && !canPromoteToRole(userRole, usuario.role)) {
        showSnackbar('Você não tem permissão para definir esta role', 'error');
        return;
      }

      const token = sessionStorage.getItem('@airbnb-Token');
      if (!token) throw new Error('Token não encontrado');

      const dadosParaEnviar = prepararDadosUsuario(usuario);
      dadosParaEnviar.enabled = true;

      const response = await api.post('/usuarios', dadosParaEnviar, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const novoUsuario: Usuario = normalizarUsuarioLocal({
        ...usuario,
        id: response.data.id
      });

      setUsuarios(prev => [...prev, novoUsuario]);
      showSnackbar('Usuário criado com sucesso', 'success');
      setAdicionarOpen(false);
    } catch (err: any) {
      const mensagem = err.response?.data?.message
        || err.response?.data?.detail
        || err.response?.data
        || 'Erro ao criar usuário. Tente novamente.';

      showSnackbar(
        typeof mensagem === 'string' ? mensagem : 'Erro ao criar usuário',
        'error'
      );
    }
  };

  /* ================= EDITAR USUÁRIO ================= */

  const handleSalvarEdicao = async (usuario: Usuario): Promise<void> => {
    try {
      if (!podeEditarUsuario(usuario)) {
        showSnackbar('Você não tem permissão para editar este usuário', 'error');
        return;
      }

      if (usuario.role && !canPromoteToRole(userRole, usuario.role)) {
        showSnackbar('Você não tem permissão para definir esta role', 'error');
        return;
      }

      const token = sessionStorage.getItem('@airbnb-Token');
      if (!token) throw new Error('Token não encontrado');

      const dadosParaEnviar = prepararDadosUsuario(usuario);

      await api.put(`/usuarios/${usuario.id}`, dadosParaEnviar, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const usuarioAtualizado = normalizarUsuarioLocal(usuario);

      setUsuarios(prev =>
        prev.map(u => u.id === usuarioAtualizado.id ? usuarioAtualizado : u)
      );

      showSnackbar('Usuário atualizado com sucesso', 'success');
      setEditarOpen(false);
      setUsuarioSelecionado(null);
    } catch (err: any) {
      if (err.response?.status === 403) {
        showSnackbar('Somente administradores podem definir outro usuário como Administrador.', 'error');
      } else if (err.response?.status === 400) {
        const mensagem = err.response?.data?.message
          || err.response?.data?.detail
          || err.response?.data
          || 'Dados inválidos';
        showSnackbar(typeof mensagem === 'string' ? mensagem : 'Dados inválidos', 'error');
      } else if (err.response?.status === 404) {
        showSnackbar('Usuário não encontrado', 'error');
      } else {
        showSnackbar('Erro ao atualizar usuário', 'error');
      }
    }
  };

  /* ================= DELETAR USUÁRIO ================= */

  const handleConfirmarDelete = async () => {
    if (!usuarioSelecionado) return;

    try {
      if (!podeDeletarUsuario(usuarioSelecionado)) {
        showSnackbar('Você não tem permissão para deletar este usuário', 'error');
        setDeleteOpen(false);
        return;
      }

      const token = sessionStorage.getItem('@airbnb-Token');
      if (!token) throw new Error('Token não encontrado');

      await api.delete(`/usuarios/${usuarioSelecionado.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsuarios(prev => prev.filter(u => u.id !== usuarioSelecionado.id));

      showSnackbar('Usuário deletado com sucesso', 'success');
      setDeleteOpen(false);
      setUsuarioSelecionado(null);
    } catch (err: any) {
      const mensagem = err.response?.data?.message
        || err.response?.data?.detail
        || err.response?.data
        || 'Erro ao deletar usuário';

      showSnackbar(typeof mensagem === 'string' ? mensagem : 'Erro ao deletar usuário', 'error');
    }
  };

  /* ================= HANDLERS DE UI ================= */

  const handleEditarClick = useCallback((usuario: Usuario) => {
    if (!podeEditarUsuario(usuario)) {
      showSnackbar('Você não tem permissão para editar este usuário', 'error');
      return;
    }
    setUsuarioSelecionado(usuario);
    setEditarOpen(true);
  }, [podeEditarUsuario, showSnackbar]);

  const handleDeletarClick = useCallback((usuario: Usuario) => {
    if (!podeDeletarUsuario(usuario)) {
      showSnackbar('Você não tem permissão para deletar este usuário', 'error');
      return;
    }
    setUsuarioSelecionado(usuario);
    setDeleteOpen(true);
  }, [podeDeletarUsuario, showSnackbar]);

  const handleFecharEditar = useCallback(() => {
    setEditarOpen(false);
    setUsuarioSelecionado(null);
  }, []);

  const handleFecharDelete = useCallback(() => {
    setDeleteOpen(false);
    setUsuarioSelecionado(null);
  }, []);

  const handleFecharAdicionar = useCallback(() => {
    setAdicionarOpen(false);
  }, []);

  /* ================= UTILITÁRIOS DE UI ================= */

  const getStatusColor = (enabled: boolean): string => {
    return enabled ? '#4caf50' : '#f44336';
  };

  const getStatusText = (enabled: boolean): string => {
    return enabled ? 'Ativo' : 'Inativo';
  };

  /* ================= RENDER ================= */

  const renderConteudo = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box textAlign="center" py={4}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button variant="outlined" onClick={buscarUsuarios}>
            Tentar novamente
          </Button>
        </Box>
      );
    }

    if (usuarios.length === 0) {
      return (
        <Box textAlign="center" py={4}>
          <Typography color="textSecondary" gutterBottom>
            Nenhum usuário encontrado
          </Typography>
          {podeCriarUsuario() && (
            <Button
              variant="contained"
              startIcon={<BsPersonBadge />}
              onClick={() => setAdicionarOpen(true)}
              sx={{ mt: 2 }}
            >
              Adicionar primeiro usuário
            </Button>
          )}
        </Box>
      );
    }

    return usuarios.map((usuario) => (
      <Paper
        key={usuario.id}
        sx={{
          p: 2,
          mb: 2,
          transition: 'box-shadow 0.3s',
          '&:hover': { boxShadow: 3 }
        }}
        elevation={1}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={2} alignItems="center">
            <Avatar sx={{ bgcolor: '#0053d9' }}>
              <BsPerson />
            </Avatar>

            <Box>
              <Typography fontWeight={600}>
                {usuario.nome}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {usuario.email}
              </Typography>
              {usuario.cargo && (
                <Typography variant="caption" color="textSecondary">
                  {usuario.cargo} • {getRoleLabel(usuario.role)}
                </Typography>
              )}
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Chip
              label={getStatusText(usuario.enabled)}
              size="small"
              sx={{
                backgroundColor: getStatusColor(usuario.enabled) + '20',
                color: getStatusColor(usuario.enabled),
                fontWeight: 600
              }}
            />

            <GerenciamentoPopover
              usuario={usuario}
              onEditar={handleEditarClick}
              onDeletar={handleDeletarClick}
              podeEditar={podeEditarUsuario(usuario)}
              podeDeletar={podeDeletarUsuario(usuario)}
            />
          </Box>
        </Box>
      </Paper>
    ));
  };

  /* ================= RETURN ================= */

  return (
    <BasicLayout>
      <Breadcrumbs />
      <DemoNotice />

      <Box sx={{ mt: 3 }}>
        <Paper sx={{ p: { xs: 2, sm: 5 }, maxWidth: 1000, mx: 'auto' }}>
          <Typography variant="h4" textAlign="center" mb={1} fontWeight={600}>
            Gerenciamento de Usuários
          </Typography>

          <Typography variant="body2" textAlign="center" mb={4} color="textSecondary">
            Logado como: {getRoleLabel(userRole)}
          </Typography>

          <Box sx={{ minHeight: 200 }}>
            {renderConteudo()}
          </Box>

          {podeCriarUsuario() && (
            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                startIcon={<BsPersonBadge />}
                onClick={() => setAdicionarOpen(true)}
                disabled={loading}
                sx={{
                  backgroundColor: '#0053d9',
                  '&:hover': { backgroundColor: '#0042b3' }
                }}
              >
                ADICIONAR USUÁRIO
              </Button>
            </Box>
          )}
        </Paper>
      </Box>

      <AdicionarPerfilModal
        open={adicionarOpen}
        onClose={handleFecharAdicionar}
        onSalvar={handleSalvarNovo}
        userRole={userRole}
      />

      <EditarPerfilModal
        open={editarOpen}
        onClose={handleFecharEditar}
        usuario={usuarioSelecionado}
        onSalvar={handleSalvarEdicao}
        canPromoteToAdmin={canPromoteToAdmin}
        userRole={userRole}
      />

      <ConfirmarDeleteModal
        open={deleteOpen}
        onClose={handleFecharDelete}
        onConfirmar={handleConfirmarDelete}
        usuarioNome={usuarioSelecionado?.nome || ''}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} variant="filled" onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </BasicLayout>
  );
}
