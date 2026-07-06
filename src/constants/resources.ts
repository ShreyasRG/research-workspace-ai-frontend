import type { Tag } from '../types/common';

export const RESOURCE_TYPE_LABELS: Record<string, string> = {
  article: 'Article',
  video: 'Video',
  note: 'Note',
};

export const RESOURCE_STATUS_LABELS: Record<string, string> = {
  unread: 'Unread',
  reading: 'Reading',
  completed: 'Completed',
  archived: 'Archived',
};

export const RESOURCE_STATUS_COLORS: Record<string, string> = {
  unread: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
  reading: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  completed: 'bg-success-100 text-success-700 dark:bg-success-900/40 dark:text-success-300',
  archived: 'bg-warning-100 text-warning-700 dark:bg-warning-900/40 dark:text-warning-300',
};

export const TAGS: Record<string, Tag> = {
  ai: { id: 't1', label: 'AI', color: 'blue' },
  ml: { id: 't2', label: 'Machine Learning', color: 'indigo' },
  research: { id: 't3', label: 'Research', color: 'emerald' },
  webdev: { id: 't4', label: 'Web Development', color: 'amber' },
  systems: { id: 't5', label: 'Systems', color: 'rose' },
  nlp: { id: 't6', label: 'NLP', color: 'cyan' },
  data: { id: 't7', label: 'Data Science', color: 'violet' },
  security: { id: 't8', label: 'Security', color: 'red' },
  cloud: { id: 't9', label: 'Cloud', color: 'sky' },
  product: { id: 't10', label: 'Product', color: 'teal' },
};

export const TAG_COLORS: Record<string, string> = {
  blue: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
};

export const WORKSPACE_COLORS = [
  'from-primary-500 to-accent-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
  'from-sky-500 to-cyan-500',
  'from-violet-500 to-purple-500',
];
