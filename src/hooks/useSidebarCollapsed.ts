import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants';

export function useSidebarCollapsed(): [boolean, (v: boolean) => void] {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.sidebar) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.sidebar, String(collapsed));
  }, [collapsed]);

  return [collapsed, setCollapsed];
}
