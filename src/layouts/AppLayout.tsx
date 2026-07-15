import { useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useSidebarCollapsed } from '../hooks/useSidebarCollapsed';
import { NAV_ITEMS } from '../constants';
import { cn } from '../utils';
import {
  LayoutDashboard,
  FolderKanban,
  Search,
  Sparkles,
  UserCircle,
  Brain,
  X,
} from 'lucide-react';

const ICONS: Record<string, any> = {
  LayoutDashboard,
  FolderKanban,
  Search,
  Sparkles,
  UserCircle,
};

interface NavItem {
  id: string;
  path: string;
  icon: string;
  label: string;
}

export function AppLayout({ children }: { children: ReactNode }) {
  // FIXED: Clean object destructuring using the hook's native keys ('collapsed' and 'toggle')
  const { collapsed, toggle } = useSidebarCollapsed() as { 
    collapsed: boolean; 
    toggle: () => void; 
  };
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* FIXED: Passed the toggle function down cleanly to Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={toggle} />

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 bg-white dark:bg-gray-900 flex flex-col animate-slide-in-left">
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white shadow-sm">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight">Research</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight">Workspace</p>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="btn-ghost p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {(NAV_ITEMS as unknown as NavItem[]).map((item) => {
                const Icon = ICONS[item.icon] ?? LayoutDashboard;
                const active = location.pathname.startsWith(item.path);
                return (
                  <button
                    key={item.id}
                    onClick={() => { setMobileOpen(false); navigate(item.path); }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800',
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMobileMenu={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
