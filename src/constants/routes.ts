export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  WORKSPACES: '/workspaces',
  WORKSPACE_DETAIL: '/workspaces/:id',
  RESOURCE_DETAIL: '/resources/:id',
  SEARCH: '/search',
  SUMMARIES: '/summaries',
  SUMMARY_DETAIL: '/summaries/:id',
  PROFILE: '/profile',
  ROOT: '/',
} as const;

export function workspacePath(id: string): string {
  return `/workspaces/${id}`;
}

export function resourcePath(id: string): string {
  return `/resources/${id}`;
}

export function summaryPath(id: string): string {
  return `/summaries/${id}`;
}
