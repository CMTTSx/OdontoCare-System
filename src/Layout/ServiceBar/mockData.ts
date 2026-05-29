import { AttendanceItem } from './types';

export const activeAttendanceMockups: AttendanceItem[] = [
  {
    id: 'att-001',
    name: 'Mayara Silva Souza',
    age: '26 Anos e 7 Meses',
    dateTime: '22/12/2022 10:30',
    status: 'Em Atendimento',
    color: '#05F140',
    isMockup: true,
  },
  {
    id: 'att-002',
    name: 'Abílio Diniz Jorge',
    age: '60 Anos e 7 Meses',
    dateTime: '22/12/2022 11:00',
    status: 'Agendado',
    color: '#5465FF',
    isMockup: true,
  },
  {
    id: 'att-003',
    name: 'Dionária Almeida Luz',
    age: '24 Anos e 6 Meses',
    dateTime: '22/12/2022 11:00',
    status: 'Faltou',
    color: '#FF9000',
    isMockup: true,
  },
];

export const finishedAttendanceMockups: AttendanceItem[] = [
  {
    id: 'att-004',
    name: 'Fabiane Santos Cruz',
    age: '33 Anos e 4 Meses',
    dateTime: '22/12/2022 11:00',
    status: 'Finalizado',
    color: '#0F9D58',
    isMockup: true,
  },
  {
    id: 'att-005',
    name: 'Solange Alves Reis',
    age: '48 Anos e 3 Meses',
    dateTime: '22/12/2022 11:30',
    status: 'Cancelado',
    color: '#FF3562',
    isMockup: true,
  },
];

export const allAttendanceMockups: AttendanceItem[] = [
  ...activeAttendanceMockups,
  ...finishedAttendanceMockups,
];
