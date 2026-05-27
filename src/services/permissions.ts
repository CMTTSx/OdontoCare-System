// src/services/permissions.ts
import api from './api';
import { getPrimaryRoleName, isAdminRole, RoleName } from './roles';

export const isAdmin = async (): Promise<boolean> => {
  try {
    const response = await api.get('/usuarios/me');
    const role = getPrimaryRoleName(response.data.roles);
    return isAdminRole(role);
  } catch (error) {
    console.error('Erro ao verificar permissões:', error);
    return false;
  }
};

export const usuarioLogadoIsAdmin = isAdmin;

export const getUserRole = async (): Promise<RoleName> => {
  try {
    const response = await api.get('/usuarios/me');
    return getPrimaryRoleName(response.data.roles);
  } catch (error) {
    console.error('Erro ao obter role:', error);
    return 'USER';
  }
};

// ✅ NOVA FUNÇÃO: Verifica se o usuário tem uma role específica
export const hasRole = async (roleName: RoleName): Promise<boolean> => {
  try {
    const userRole = await getUserRole();
    return userRole === roleName;
  } catch (error) {
    return false;
  }
};

// ✅ NOVA FUNÇÃO: Verifica se é SUPER_ADMIN
export const isSuperAdmin = async (): Promise<boolean> => {
  return hasRole('SUPER_ADMIN');
};