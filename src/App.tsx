import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { WorkspacesPage } from './pages/WorkspacesPage';
import { WorkspaceDetailPage } from './pages/WorkspaceDetailPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { SummariesPage } from './pages/SummariesPage';
import { SummaryDetailPage } from './pages/SummaryDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { SearchPage } from './pages/SearchPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { OAuthCallback } from './pages/OAuthCallback';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { ROUTES } from './constants';

export function App() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path="/oauth/callback" element={<OAuthCallback />} />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.WORKSPACES}
        element={
          <ProtectedRoute>
            <Layout>
              <WorkspacesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.WORKSPACE}
        element={
          <ProtectedRoute>
            <Layout>
              <WorkspaceDetailPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.RESOURCE}
        element={
          <ProtectedRoute>
            <Layout>
              <ResourceDetailPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SUMMARIES}
        element={
          <ProtectedRoute>
            <Layout>
              <SummariesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SUMMARY}
        element={
          <ProtectedRoute>
            <Layout>
              <SummaryDetailPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <ProtectedRoute>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SEARCH}
        element={
          <ProtectedRoute>
            <Layout>
              <SearchPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Layout>
              <NotFoundPage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
