export const ROUTES = {
  DASHBOARD: '/', WORKSPACES: '/workspaces', WORKSPACE: '/workspaces/:id',
  RESOURCE: '/resources/:id', SUMMARIES: '/summaries', SUMMARY: '/summaries/:id',
  PROFILE: '/profile', SEARCH: '/search', LOGIN: '/login',
} as const;

export const APP_NAME = 'Research Hub';

export const QUERY_KEYS = {
  workspaces: ['workspaces'] as const,
  workspace: (id: string) => ['workspaces', id] as const,
  resources: ['resources'] as const,
  resourcesByWorkspace: (id: string) => ['resources', 'workspace', id] as const,
  resource: (id: string) => ['resources', id] as const,
  summaries: ['summaries'] as const,
  summary: (id: string) => ['summaries', id] as const,
  profile: ['profile'] as const,
  notifications: ['notifications'] as const,
  search: (q: string) => ['search', q] as const,
};

export const STORAGE_KEYS = { THEME: 'rh-theme', SIDEBAR_COLLAPSED: 'rh-sidebar-collapsed', VIEW_MODE: 'rh-view-mode', AUTH: 'rh-auth' };
