export type PerfilName = 'RECEPCIONISTA' | 'ODONTOLOGO';
export type RoleName = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface UsuarioUpdateDTO {
  fullName?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  telefone?: string;
  perfil?: string;
  role?: string;
  enabled?: boolean;
}

export interface UsuarioDTO {
  id: number;
  fullName: string;
  email: string;
  cpf: string;
  phone: string;
  perfil: string;
  role: RoleName;
  enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserFormData {
  fullName: string;
  email: string;
  cpf: string;
  phone: string;
  perfil: string;
  role: string;
  enabled: boolean;
}