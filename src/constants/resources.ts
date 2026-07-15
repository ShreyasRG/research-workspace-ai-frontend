import type { ResourceType } from '../types';

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  article: 'Article', video: 'Video', note: 'Note',
};

export const TAG_COLORS: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
};

export const WORKSPACE_COLORS = ['#0969da', '#1a7f37', '#8250df', '#bf8700', '#d1242f', '#1f883d', '#0550ae', '#6e40c9'];
export const WORKSPACE_ICONS = ['ShieldCheck', 'Server', 'Target', 'BrainCircuit', 'BookOpen', 'Lightbulb', 'FolderTree', 'Compass'];
