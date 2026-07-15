import { TriangleAlert as AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';

interface ConfirmDialogProps { open: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string; confirmLabel?: string; cancelLabel?: string; }
export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Delete', cancelLabel = 'Cancel' }: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-md bg-danger-subtle flex items-center justify-center text-danger-fg shrink-0"><AlertTriangle className="w-5 h-5" /></div>
        <p className="text-sm text-fg-muted pt-1">{message}</p>
      </div>
      <div className="flex items-center justify-end gap-2 mt-5">
        <button onClick={onClose} className="btn-secondary">{cancelLabel}</button>
        <button onClick={() => { onConfirm(); onClose(); }} className="btn-danger">{confirmLabel}</button>
      </div>
    </Modal>
  );
}
