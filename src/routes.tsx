import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Pages
import PaginaInicial from './Pages/Home';
import SignIn from './Pages/SignIn';
import Agenda from './Pages/Agenda';
import Clientes from './Pages/Clientes';
import Financeiro from './Pages/Financeiro';
import Suporte from './Pages/Suporte';
import Gerenciamento from './Pages/Gerenciamento';

// Services
import { isAuthenticated } from './services/auth';
import { usuarioLogadoIsAdmin } from './services/permissions';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const [isUserAdmin, setIsUserAdmin] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    let mounted = true;

    async function checkAdmin() {
      try {
        const admin = await usuarioLogadoIsAdmin();
        if (mounted) {
          setIsUserAdmin(admin);
        }
      } catch (error) {
        console.error('Erro ao verificar admin:', error);
        if (mounted) {
          setIsUserAdmin(false);
        }
      }
    }

    checkAdmin();

    return () => {
      mounted = false;
    };
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isUserAdmin === null) {
    return <div>Carregando...</div>;
  }

  if (!isUserAdmin) {
    return <Navigate to="/paginaInicial" replace />;
  }

  return children;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<SignIn />} />

        {/* Rotas privadas */}
        <Route
          path="/paginaInicial"
          element={
            <PrivateRoute>
              <PaginaInicial />
            </PrivateRoute>
          }
        />

        <Route
          path="/agenda"
          element={
            <PrivateRoute>
              <Agenda />
            </PrivateRoute>
          }
        />

        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <Clientes />
            </PrivateRoute>
          }
        />

        <Route
          path="/financeiro"
          element={
            <PrivateRoute>
              <Financeiro />
            </PrivateRoute>
          }
        />

        <Route
          path="/suporte"
          element={
            <PrivateRoute>
              <Suporte />
            </PrivateRoute>
          }
        />

        {/* Rota admin */}
        <Route
          path="/gerenciamento"
          element={
            <AdminRoute>
              <Gerenciamento />
            </AdminRoute>
          }
        />

        {/* Redirecionamentos */}
        <Route path="/" element={<Navigate to="/paginaInicial" replace />} />
        <Route path="*" element={<Navigate to="/paginaInicial" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
