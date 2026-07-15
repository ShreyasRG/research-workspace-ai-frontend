export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/api/v1/auth/login',
  AUTH_LOGOUT: '/api/v1/auth/logout',
  AUTH_REFRESH: '/api/v1/auth/refresh',
  AUTH_ME: '/api/v1/auth/me',
  AUTH_GOOGLE: '/api/v1/auth/oauth/google',
  AUTH_GITHUB: '/api/v1/auth/oauth/github',

  // Workspaces
  WORKSPACES: '/api/v1/workspaces',
  WORKSPACE_BY_ID: '/api/v1/workspaces/:id',

  // Resources
  RESOURCES: '/api/v1/resources',
  RESOURCE_BY_ID: '/api/v1/resources/:id',

  // Search
  SEARCH: '/api/v1/search',

  // Summaries
  SUMMARIES: '/api/v1/summaries',
  SUMMARY_BY_ID: '/api/v1/summaries/:id',

  // Profile
  PROFILE: '/api/v1/profile',
  NOTIFICATIONS: '/api/v1/profile/notifications',
} as const;
