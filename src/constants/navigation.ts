import { LayoutDashboard, FolderTree, Sparkles, User, Search } from 'lucide-react';

export interface NavItem { label: string; to: string; icon: typeof LayoutDashboard; }
export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Workspaces', to: '/workspaces', icon: FolderTree },
  { label: 'Summaries', to: '/summaries', icon: Sparkles },
  { label: 'Search', to: '/search', icon: Search },
  { label: 'Profile', to: '/profile', icon: User },
];
