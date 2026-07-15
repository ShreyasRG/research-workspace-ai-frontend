import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../utils';

interface ModalProps { open: boolean; onClose: () => void; title?: string; description?: string; children: ReactNode; footer?: ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl'; }
const SIZES = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' } as const;

export function Modal({ open, onClose, title, description, children, footer, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 animate-fade-in" onClick={onClose} aria-hidden />
      <div role="dialog" aria-modal="true" className={cn('relative w-full bg-canvas-default border border-border-default rounded-md shadow-lg max-h-[90vh] flex flex-col animate-fade-in-scale', SIZES[size])}>
        {(title || description) && (
          <div className="px-4 py-3 border-b border-border-default">
            {title && <h2 className="text-base font-semibold text-fg-default">{title}</h2>}
            {description && <p className="text-sm text-fg-muted mt-0.5">{description}</p>}
          </div>
        )}
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded text-fg-subtle hover:text-fg-default hover:bg-canvas-subtle transition-colors z-10" aria-label="Close"><X className="w-4 h-4" /></button>
        <div className="px-4 py-4 overflow-y-auto flex-1">{children}</div>
        {footer && <div className="px-4 py-3 border-t border-border-default flex items-center justify-end gap-2">{footer}</div>}
      </div>
    </div>, document.body,
  );
}
