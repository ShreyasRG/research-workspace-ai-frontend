import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Sun, Moon, Menu, LogOut, UserCircle, Settings, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Avatar } from '../components/ui/Avatar';
import { profileService } from '../services';
import type { Notification } from '../types';
import { formatRelative, cn } from '../utils';
import { ROUTES } from '../constants';

interface NavbarProps {
  onMobileMenu: () => void;
}

export function Navbar({ onMobileMenu }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    profileService.getNotifications().then(setNotifications);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((n) => n.map((x) => ({ ...x, read: true })));
  };

  return (
    <header className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30">
      <button
        className="md:hidden btn-ghost p-2"
        onClick={onMobileMenu}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <button
        onClick={() => navigate(ROUTES.SEARCH)}
        className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-64"
      >
        <Search className="w-4 h-4" />
        <span>Search resources…</span>
        <kbd className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-400">
          ⌘K
        </kbd>
      </button>

      <button
        onClick={() => navigate(ROUTES.SEARCH)}
        className="md:hidden btn-ghost p-2"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>

      <div className="ml-auto flex items-center gap-1">
        <button
          onClick={toggleTheme}
          className="btn-ghost p-2"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="btn-ghost p-2 relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error-500 ring-2 ring-white dark:ring-gray-900" />
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 card shadow-elevated p-2 animate-fade-in-scale origin-top-right">
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</p>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      'px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer',
                      !n.read && 'bg-primary-50/50 dark:bg-primary-900/20',
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{n.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{formatRelative(n.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={userRef}>
          <button
            onClick={() => setUserOpen((o) => !o)}
            className="flex items-center gap-2 p-1 pr-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Avatar name={user?.name ?? ''} src={user?.avatarUrl} size="sm" />
          </button>
          {userOpen && (
            <div className="absolute right-0 mt-2 w-60 card shadow-elevated p-2 animate-fade-in-scale origin-top-right">
              <div className="px-3 py-3 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{user?.email}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => { setUserOpen(false); navigate(ROUTES.PROFILE); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <UserCircle className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={() => { setUserOpen(false); navigate(ROUTES.PROFILE); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>
              <div className="pt-1 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => logout()}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
