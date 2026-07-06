import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants';
import { getItem, setItem } from '../utils/storage';

export function useSidebarCollapsed(): [boolean, (v: boolean) => void] {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    return getItem<boolean>(STORAGE_KEYS.sidebar) === true;
  });

  useEffect(() => {
    setItem(STORAGE_KEYS.sidebar, collapsed);
  }, [collapsed]);

  return [collapsed, setCollapsed];
}
