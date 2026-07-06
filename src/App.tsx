import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppLayout } from './layouts/AppLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { ROUTES } from './constants';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { WorkspacesPage } from './pages/WorkspacesPage';
import { WorkspaceDetailPage } from './pages/WorkspaceDetailPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { SearchPage } from './pages/SearchPage';
import { SummariesPage } from './pages/SummariesPage';
import { SummaryDetailPage } from './pages/SummaryDetailPage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route
                  path={ROUTES.ROOT}
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <DashboardPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.DASHBOARD}
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <DashboardPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.WORKSPACES}
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <WorkspacesPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.WORKSPACE_DETAIL}
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <WorkspaceDetailPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.RESOURCE_DETAIL}
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <ResourceDetailPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.SEARCH}
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <SearchPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.SUMMARIES}
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <SummariesPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.SUMMARY_DETAIL}
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <SummaryDetailPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.PROFILE}
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <ProfilePage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
