/**
 * Centralized environment configuration.
 *
 * This is the ONLY module that reads `import.meta.env`.
 * All other modules must import from here — never access env vars directly.
 *
 * When connecting to a real backend, set these in your `.env` file:
 *   VITE_APP_NAME=AI Research Workspace
 *   VITE_API_URL=http://localhost:8080
 *   VITE_GRAPHQL_URL=http://localhost:8080/graphql
 */

interface EnvConfig {
  appName: string;
  apiUrl: string;
  graphqlUrl: string;
  isDev: boolean;
  isProd: boolean;
}

function parseEnv(): EnvConfig {
  const env = import.meta.env;
  return {
    appName: env.VITE_APP_NAME ?? 'AI Research Workspace',
    apiUrl: env.VITE_API_URL ?? 'http://localhost:8080',
    graphqlUrl: env.VITE_GRAPHQL_URL ?? 'http://localhost:8080/graphql',
    isDev: env.DEV === true,
    isProd: env.PROD === true,
  };
}

export const config: EnvConfig = parseEnv();
