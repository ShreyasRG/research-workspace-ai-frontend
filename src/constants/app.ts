export const THEME_VALUES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export const TOAST_DURATION = {
  DEFAULT: 4000,
  ERROR: 6000,
  SUCCESS: 4000,
  INFO: 4000,
  WARNING: 5000,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
} as const;

export const MOCK_LATENCY = {
  min: 350,
  max: 900,
} as const;
