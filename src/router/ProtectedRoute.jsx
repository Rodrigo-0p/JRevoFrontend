import { Navigate } from 'react-router-dom';
import { useAuth  } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
const { usuario, loading } = useAuth();

  // Mientras carga la sesión, no renderices nada (o muestra un spinner)
  if (loading) return null;

  // Cuando ya cargó, decide
  return usuario
    ? children
    : <Navigate to="/" replace />;
}
