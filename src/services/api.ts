type MockResponse<T = any> = Promise<{ data: T; status: number }>;

type Cliente = {
  id: number;
  fullName: string;
  cpf?: string;
  dataNasc?: string;
  contato?: string;
  email?: string;
  cidade?: string;
  estado?: string;
  logradouro?: string;
  numero?: string;
  [key: string]: any;
};

type Usuario = {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  cpf?: string;
  enabled: boolean;
  perfil?: string;
  role?: string;
  roles?: Array<{ name: string }>;
};

type Agendamento = {
  id: number;
  fullName: string;
  dataAgendamento: string;
  horarioAgendamento: string;
  pacienteId: number;
  status: string;
};

type Ticket = {
  id: number;
  title: string;
  assunto?: string;
  status: string;
  prioridade?: string;
  usuario?: string;
  createdAt: string;
  [key: string]: any;
};

const STORAGE_KEY = 'odontocare-showcase-db';

const today = new Date().toISOString().split('T')[0];

const initialDb = {
  clientes: [
    {
      id: 1,
      fullName: 'Marina Costa',
      cpf: '12345678910',
      dataNasc: '1991-04-12',
      contato: '(91) 98888-1200',
      email: 'marina.costa@email.com',
      estado: 'PA',
      cidade: 'Belem',
      bairro: 'Umarizal',
      logradouro: 'Travessa Dom Romualdo de Seixas',
      numero: '740',
    },
    {
      id: 2,
      fullName: 'Rafael Almeida',
      cpf: '98765432100',
      dataNasc: '1986-09-03',
      contato: '(91) 97777-4500',
      email: 'rafael.almeida@email.com',
      estado: 'PA',
      cidade: 'Ananindeua',
      bairro: 'Centro',
      logradouro: 'Avenida Brasil',
      numero: '215',
    },
  ] as Cliente[],
  usuarios: [
    {
      id: 1,
      fullName: 'Carla Mendes',
      email: 'admin@odontocare.demo',
      phone: '(91) 99999-0001',
      cpf: '11122233344',
      enabled: true,
      perfil: 'DENTISTA',
      role: 'SUPER_ADMIN',
      roles: [{ name: 'SUPER_ADMIN' }],
    },
    {
      id: 2,
      fullName: 'Lucas Pereira',
      email: 'recepcao@odontocare.demo',
      phone: '(91) 99999-0002',
      cpf: '55566677788',
      enabled: true,
      perfil: 'RECEPCIONISTA',
      role: 'ADMIN',
      roles: [{ name: 'ADMIN' }],
    },
  ] as Usuario[],
  agendamentos: [
    {
      id: 1,
      fullName: 'Marina Costa',
      dataAgendamento: today,
      horarioAgendamento: '09:00',
      pacienteId: 1,
      status: 'CONFIRMADO',
    },
    {
      id: 2,
      fullName: 'Rafael Almeida',
      dataAgendamento: today,
      horarioAgendamento: '14:30',
      pacienteId: 2,
      status: 'AGENDADO',
    },
  ] as Agendamento[],
  suporte: [
    {
      id: 1,
      title: 'Ajustar horario da agenda',
      assunto: 'Agenda',
      status: 'ABERTO',
      prioridade: 'MEDIA',
      usuario: 'Carla Mendes',
      createdAt: today,
      descricao: 'Solicitacao demonstrativa para validar o fluxo de suporte.',
    },
  ] as Ticket[],
  messages: [
    {
      id: 1,
      suporteId: 1,
      message: 'Ticket criado para showcase.',
      createdAt: today,
      senderName: 'Carla Mendes',
    },
  ],
};

type Db = typeof initialDb;

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function loadDb(): Db {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDb));
    return clone(initialDb);
  }

  return JSON.parse(stored);
}

function saveDb(db: Db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function nextId(items: Array<{ id: number }>) {
  return Math.max(0, ...items.map(item => item.id)) + 1;
}

function response<T>(data: T, status = 200): MockResponse<T> {
  return new Promise(resolve => {
    window.setTimeout(() => resolve({ data: clone(data), status }), 180);
  });
}

function getPacienteNome(db: Db, pacienteId: number) {
  return db.clientes.find(cliente => cliente.id === pacienteId)?.fullName || 'Paciente demo';
}

const api = {
  get<T = any>(url: string, config?: any): MockResponse<T> {
    const db = loadDb();
    const [path] = url.split('?');

    if (path === '/usuarios/me') {
      return response(db.usuarios[0] as T);
    }

    if (path === '/usuarios') {
      return response(db.usuarios as T);
    }

    if (path.startsWith('/usuarios/')) {
      const id = Number(path.split('/').pop());
      return response(db.usuarios.find(usuario => usuario.id === id) as T);
    }

    if (path === '/clientes') {
      const fullName = config?.params?.fullName?.toLowerCase();
      const clientes = fullName
        ? db.clientes.filter(cliente => cliente.fullName.toLowerCase().includes(fullName))
        : db.clientes;
      return response(clientes as T);
    }

    if (path.startsWith('/clientes/')) {
      const id = Number(path.split('/').pop());
      return response(db.clientes.find(cliente => cliente.id === id) as T);
    }

    if (path === '/agendamentos') {
      return response(db.agendamentos as T);
    }

    if (path === '/suporte') {
      return response(db.suporte as T);
    }

    if (path.startsWith('/suporte/')) {
      const id = Number(path.split('/').pop());
      return response(db.suporte.find(ticket => ticket.id === id) as T);
    }

    if (path.startsWith('/ticket-messages/suporte/')) {
      const id = Number(path.split('/').pop());
      return response(db.messages.filter(message => message.suporteId === id) as T);
    }

    return response({} as T);
  },

  post<T = any>(url: string, data?: any, _config?: any): MockResponse<T> {
    const db = loadDb();

    if (url === '/auth/login') {
      return response({ token: 'showcase-token', user: db.usuarios[0] } as T);
    }

    if (url === '/usuarios') {
      const novo = {
        id: nextId(db.usuarios),
        enabled: true,
        ...data,
        fullName: data.fullName || data.nome,
        phone: data.phone || data.telefone,
        roles: [{ name: data.role || 'USER' }],
      };
      db.usuarios.push(novo);
      saveDb(db);
      return response(novo as T, 201);
    }

    if (url === '/clientes') {
      const novo = { id: nextId(db.clientes), ...data };
      db.clientes.push(novo);
      saveDb(db);
      return response(novo as T, 201);
    }

    if (url === '/agendamentos') {
      const pacienteId = Number(data.clienteId || data.pacienteId);
      const novo = {
        id: nextId(db.agendamentos),
        pacienteId,
        fullName: getPacienteNome(db, pacienteId),
        dataAgendamento: data.data || data.dataAgendamento,
        horarioAgendamento: data.hora || data.horarioAgendamento,
        status: data.status || 'AGENDADO',
      };
      db.agendamentos.push(novo);
      saveDb(db);
      return response(novo as T, 201);
    }

    if (url === '/suporte') {
      const novo = {
        id: nextId(db.suporte),
        status: 'ABERTO',
        createdAt: today,
        ...data,
      };
      db.suporte.push(novo);
      saveDb(db);
      return response(novo as T, 201);
    }

    if (url.startsWith('/ticket-messages/')) {
      const suporteId = Number(url.split('/').pop());
      const novo = { id: nextId(db.messages), suporteId, createdAt: today, ...data };
      db.messages.push(novo);
      saveDb(db);
      return response(novo as T, 201);
    }

    return response({} as T, 201);
  },

  put<T = any>(url: string, data?: any, _config?: any): MockResponse<T> {
    const db = loadDb();

    if (url.startsWith('/usuarios/')) {
      const id = Number(url.split('/').pop());
      const index = db.usuarios.findIndex(usuario => usuario.id === id);
      db.usuarios[index] = {
        ...db.usuarios[index],
        ...data,
        fullName: data.fullName || db.usuarios[index].fullName,
        phone: data.phone || db.usuarios[index].phone,
        roles: [{ name: data.role || db.usuarios[index].role || 'USER' }],
      };
      saveDb(db);
      return response(db.usuarios[index] as T);
    }

    if (url.startsWith('/clientes/')) {
      const id = Number(url.split('/').pop());
      const index = db.clientes.findIndex(cliente => cliente.id === id);
      db.clientes[index] = { ...db.clientes[index], ...data };
      saveDb(db);
      return response(db.clientes[index] as T);
    }

    if (url.startsWith('/agendamentos/')) {
      const id = Number(url.split('/').pop());
      const index = db.agendamentos.findIndex(agendamento => agendamento.id === id);
      const pacienteId = Number(data.clienteId || data.pacienteId || db.agendamentos[index].pacienteId);
      db.agendamentos[index] = {
        ...db.agendamentos[index],
        pacienteId,
        fullName: getPacienteNome(db, pacienteId),
        dataAgendamento: data.data || data.dataAgendamento || db.agendamentos[index].dataAgendamento,
        horarioAgendamento: data.hora || data.horarioAgendamento || db.agendamentos[index].horarioAgendamento,
        status: data.status || db.agendamentos[index].status,
      };
      saveDb(db);
      return response(db.agendamentos[index] as T);
    }

    return response({} as T);
  },

  delete<T = any>(url: string, _config?: any): MockResponse<T> {
    const db = loadDb();

    if (url.startsWith('/usuarios/')) {
      const id = Number(url.split('/').pop());
      db.usuarios = db.usuarios.filter(usuario => usuario.id !== id);
      saveDb(db);
    }

    if (url.startsWith('/agendamentos/')) {
      const id = Number(url.split('/').pop());
      db.agendamentos = db.agendamentos.filter(agendamento => agendamento.id !== id);
      saveDb(db);
    }

    return response({ ok: true } as T);
  },
};

export default api;
