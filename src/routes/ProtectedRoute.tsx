import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoadingScreen } from './LoadingScreen';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute", {
    pathname: location.pathname,
    isLoading,
    isAuthenticated,
  });

  if (isLoading) {
    console.log("ProtectedRoute -> Loading");
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    console.log("ProtectedRoute -> Redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("ProtectedRoute -> Rendering protected page");
  return <>{children}</>;
}
