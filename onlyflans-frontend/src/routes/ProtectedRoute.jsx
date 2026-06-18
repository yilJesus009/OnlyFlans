import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-paper px-4">
        <p className="text-sm font-medium text-stone-600">Cargando sesion...</p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'creator' ? '/creador' : '/seguidor'} replace />;
  }

  return <Outlet />;
}
