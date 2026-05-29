export type AttendanceStatus = 'Em Atendimento' | 'Agendado' | 'Faltou' | 'Cancelado' | 'Finalizado';

export type AttendanceItem = {
  id: string;
  name: string;
  age: string;
  dateTime: string;
  status: AttendanceStatus;
  color: string;
  isMockup?: boolean;
};
