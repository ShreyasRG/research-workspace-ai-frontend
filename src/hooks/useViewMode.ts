import { useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants';

export type ViewMode = 'icon' | 'list' | 'gallery';
const VALID: ViewMode[] = ['icon', 'list', 'gallery'];

function getInitial(scope: string): ViewMode {
  const stored = localStorage.getItem(`${STORAGE_KEYS.VIEW_MODE}-${scope}`) as ViewMode | null;
  return stored && VALID.includes(stored) ? stored : 'gallery';
}

export function useViewMode(scope: string) {
  const [viewMode, setViewMode] = useState<ViewMode>(() => getInitial(scope));
  const change = useCallback((mode: ViewMode) => { setViewMode(mode); localStorage.setItem(`${STORAGE_KEYS.VIEW_MODE}-${scope}`, mode); }, [scope]);
  return { viewMode, setViewMode: change };
}
