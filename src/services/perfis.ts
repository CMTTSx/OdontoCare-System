// src/services/perfis.ts
export type PerfilName = 'RECEPCIONISTA' | 'ODONTOLOGO';

export const PERFIL_VALUES: PerfilName[] = ['RECEPCIONISTA', 'ODONTOLOGO'];

export const getPerfilLabel = (perfil?: string): string => {
  switch (perfil) {
    case 'ODONTOLOGO':
      return 'Odontólogo';
    case 'RECEPCIONISTA':
      return 'Recepcionista';
    default:
      return perfil || 'Sem perfil';
  }
};

export const normalizePerfil = (perfil: string): PerfilName | null => {
  if (!perfil || perfil.trim() === '') return null;
  
  const upper = perfil.trim().toUpperCase() as PerfilName;
  
  if (PERFIL_VALUES.includes(upper)) {
    return upper;
  }
  
  return null;
};