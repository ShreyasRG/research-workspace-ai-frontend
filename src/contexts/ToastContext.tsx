import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../utils';

type ToastType = 'success' | 'error' | 'info';
interface Toast { id: string; type: ToastType; title: string; message?: string; }
interface ToastContextValue { show: (toast: Omit<Toast, 'id'>) => void; }
const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS: Record<ToastType, typeof CheckCircle2> = { success: CheckCircle2, error: AlertCircle, info: Info };

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const show = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `t${Date.now()}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);
  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type];
          return (
            <div key={toast.id} className="flex items-start gap-2.5 p-3 rounded-md border border-border-default bg-canvas-default shadow-md animate-slide-in-right">
              <Icon className={cn('w-4 h-4 shrink-0 mt-0.5', toast.type === 'success' ? 'text-success-fg' : toast.type === 'error' ? 'text-danger-fg' : 'text-accent-fg')} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-fg-default">{toast.title}</p>
                {toast.message && <p className="text-xs text-fg-muted mt-0.5">{toast.message}</p>}
              </div>
              <button onClick={() => dismiss(toast.id)} className="text-fg-subtle hover:text-fg-default shrink-0"><X className="w-3.5 h-3.5" /></button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() { const ctx = useContext(ToastContext); if (!ctx) throw new Error('useToast must be used within ToastProvider'); return ctx; }
