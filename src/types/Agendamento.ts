// src/types/Agendamento.ts

export interface Cliente {
  id: number;
  fullName: string;
}

export interface Agendamento {
  id: number;
  data: string;
  hora: string;
  status: string; 
  paciente: Cliente;
}