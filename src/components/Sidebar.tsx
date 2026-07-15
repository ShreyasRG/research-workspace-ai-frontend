import { NavLink, useNavigate } from 'react-router-dom';
import { PanelLeftClose, PanelLeftOpen, LogOut, Sun, Moon } from 'lucide-react';
import { NAV_ITEMS, APP_NAME } from '../constants';
import { useSidebarCollapsed } from '../hooks/useSidebarCollapsed';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Avatar } from './ui/Avatar';
import { cn } from '../utils';

export function Sidebar() {
  const { collapsed, toggle } = useSidebarCollapsed();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <aside className={cn('h-screen sticky top-0 flex flex-col border-r border-border-default bg-canvas-default transition-all duration-150', collapsed ? 'w-[52px]' : 'w-56')}>
      <div className={cn('flex items-center h-12 border-b border-border-default shrink-0', collapsed ? 'justify-center' : 'px-3 gap-2')}>
        <div className="w-7 h-7 rounded-md bg-fg-default flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-canvas-default" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.2.73.94.83 1.18.2.55.83 1.58 2.26 1.26.03.4.06.78.06 1.17 0 .21-.15.45-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"/></svg>
        </div>
        {!collapsed && <span className="text-sm font-semibold text-fg-default">{APP_NAME}</span>}
      </div>

      <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => cn('flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors', isActive ? 'bg-canvas-subtle text-fg-default font-medium' : 'text-fg-muted hover:bg-canvas-subtle', collapsed && 'justify-center')} title={collapsed ? item.label : undefined}>
            <item.icon className="w-4 h-4 shrink-0" />{!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border-default p-2 space-y-0.5 shrink-0">
        <button onClick={toggleTheme} className={cn('flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm text-fg-muted hover:bg-canvas-subtle w-full transition-colors', collapsed && 'justify-center')} title={collapsed ? (theme === 'light' ? 'Dark mode' : 'Light mode') : undefined}>
          {theme === 'light' ? <Moon className="w-4 h-4 shrink-0" /> : <Sun className="w-4 h-4 shrink-0" />}{!collapsed && <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>}
        </button>
        <button onClick={toggle} className={cn('flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm text-fg-muted hover:bg-canvas-subtle w-full transition-colors', collapsed && 'justify-center')} title={collapsed ? 'Expand' : 'Collapse'}>
          {collapsed ? <PanelLeftOpen className="w-4 h-4 shrink-0" /> : <PanelLeftClose className="w-4 h-4 shrink-0" />}{!collapsed && <span>Collapse</span>}
        </button>
      </div>

      <div className={cn('border-t border-border-default p-2 shrink-0', collapsed ? 'flex justify-center' : 'flex items-center gap-2 px-2 py-2')}>
        {user && (
          <div className="shrink-0 w-6 h-6 rounded-full overflow-hidden">
            <Avatar src={user.avatarUrl} alt={user.name} size="sm" />
          </div>
        )}
        {!collapsed && user && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-fg-default truncate leading-tight">{user.name}</p>
              <p className="text-xs text-fg-subtle truncate leading-tight">{user.email}</p>
            </div>
            <button onClick={() => { logout(); navigate('/login'); }} className="shrink-0 text-fg-subtle hover:text-danger-fg transition-colors" title="Sign out">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
