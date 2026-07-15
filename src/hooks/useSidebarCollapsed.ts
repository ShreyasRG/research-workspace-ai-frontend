import { useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants';

export function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState<boolean>(() => localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED) === 'true');
  const toggle = useCallback(() => { setCollapsed((prev) => { const next = !prev; localStorage.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, String(next)); return next; }); }, []);
  return { collapsed, toggle };
}
