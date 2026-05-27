// src/services/roles.ts
export type RoleName = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export const ROLE_VALUES: RoleName[] = ['USER', 'ADMIN', 'SUPER_ADMIN'];

export const ROLE_OPTIONS = [
  { value: '', label: 'Selecione uma role' },
  { value: 'USER', label: 'Usuário' },
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
];

export const isAdminRole = (roleName?: string): boolean => {
  return roleName === 'ADMIN' || roleName === 'SUPER_ADMIN';
};

export const isSuperAdminRole = (roleName?: string): boolean => {
  return roleName === 'SUPER_ADMIN';
};

export const getRoleLabel = (role?: string): string => {
  switch (role) {
    case 'ADMIN':
      return 'Administrador';
    case 'SUPER_ADMIN':
      return 'Super Admin';
    case 'USER':
      return 'Usuário';
    default:
      return role || 'Usuário';
  }
};

export const getPrimaryRoleName = (roles?: Array<{ name: string }>): RoleName => {
  if (!roles || roles.length === 0) return 'USER';

  const roleName = roles[0].name?.toUpperCase() as RoleName;

  if (roleName && ROLE_VALUES.includes(roleName)) {
    return roleName;
  }

  return 'USER';
};

export const normalizeRole = (role: string): RoleName | null => {
  if (!role || role.trim() === '') return null;

  const upper = role.trim().toUpperCase() as RoleName;

  if (ROLE_VALUES.includes(upper)) {
    return upper;
  }

  return null;
};

// ✅ NOVA FUNÇÃO: Verifica se pode promover para uma role específica
export const canPromoteToRole = (currentUserRole: string, targetRole: string): boolean => {
  // SUPER_ADMIN pode tudo
  if (currentUserRole === 'SUPER_ADMIN') return true;
  
  // ADMIN pode promover apenas para USER e ADMIN
  if (currentUserRole === 'ADMIN') {
    return targetRole === 'USER' || targetRole === 'ADMIN';
  }
  
  // USER não pode promover ninguém
  return false;
};