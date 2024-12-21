import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}