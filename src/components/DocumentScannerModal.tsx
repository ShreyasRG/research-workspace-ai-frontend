import { useState, useEffect, useCallback } from 'react';
import { ScanLine, Smartphone, Camera, Monitor, CircleCheck as CheckCircle2, Loader as Loader2, Eye, ArrowLeft, ArrowRight, FileText, Clock, Tag } from 'lucide-react';
import { Modal } from './ui/Modal';
import { useToast } from '../contexts/ToastContext';
import { useSimulateScan } from '../hooks/mutations';
import type { ScannedDocument } from '../types';
import { cn, formatDate } from '../utils';

interface Props { open: boolean; onClose: () => void; onScanComplete: (doc: ScannedDocument) => void; }
type ScanPhase = 'idle' | 'connecting' | 'waiting' | 'uploading' | 'received';
type Step = 'scan' | 'preview';

const STEPS = [
  { icon: Smartphone, label: 'Scan with phone', description: 'Open the camera app or QR reader on your mobile device and point it at the QR code.' },
  { icon: Camera, label: 'Snap document', description: 'Position your document within the frame on your phone and capture a clear photo.' },
  { icon: Monitor, label: 'View on desktop', description: 'Your scanned document will appear here automatically — no manual upload needed.' },
];

function QRPlaceholder() {
  const modules = 21;
  const cells: boolean[][] = [];
  for (let r = 0; r < modules; r++) { cells[r] = []; for (let c = 0; c < modules; c++) { cells[r][c] = (r * 31 + c * 17 + r * c) % 7 < 3; } }
  const clear = (sr: number, sc: number) => { for (let r = sr; r < sr + 7; r++) for (let c = sc; c < sc + 7; c++) cells[r][c] = false; };
  clear(0, 0); clear(0, modules - 7); clear(modules - 7, 0);
  const Finder = ({ r, c }: { r: number; c: number }) => (<g transform={`translate(${c * 8 + 4}, ${r * 8 + 4})`}><rect width="56" height="56" rx="6" fill="currentColor" /><rect x="10" y="10" width="36" height="36" rx="3" fill="white" /><rect x="18" y="18" width="20" height="20" rx="2" fill="currentColor" /></g>);
  return (
    <div className="relative w-40 h-40 mx-auto">
      <div className="absolute inset-0 rounded-md bg-white p-3 border border-border-default">
        <svg viewBox="0 0 176 176" className="w-full h-full text-fg-default">{cells.flatMap((row, r) => row.map((on, c) => on ? <rect key={`${r}-${c}`} x={c * 8 + 4} y={r * 8 + 4} width="8" height="8" fill="currentColor" /> : null))}<Finder r={0} c={0} /><Finder r={0} c={modules - 7} /><Finder r={modules - 7} c={0} /></svg>
      </div>
      <div className="absolute inset-3 overflow-hidden rounded pointer-events-none"><div className="absolute left-0 right-0 h-0.5 bg-accent-fg animate-scan-line" /></div>
    </div>
  );
}

export function DocumentScannerModal({ open, onClose, onScanComplete }: Props) {
  const { show } = useToast();
  const scanMutation = useSimulateScan();
  const [step, setStep] = useState<Step>('scan');
  const [phase, setPhase] = useState<ScanPhase>('idle');
  const [progress, setProgress] = useState(0);
  const [scannedDoc, setScannedDoc] = useState<ScannedDocument | null>(null);

  useEffect(() => { if (!open) { setStep('scan'); setPhase('idle'); setProgress(0); setScannedDoc(null); return; } setPhase('connecting'); const t = setTimeout(() => setPhase('waiting'), 800); return () => clearTimeout(t); }, [open]);
  useEffect(() => { if (phase !== 'uploading') return; setProgress(0); const i = setInterval(() => setProgress((p) => Math.min(p + 4, 100)), 60); return () => clearInterval(i); }, [phase]);

  const handleSimulate = useCallback(async () => {
    if (phase !== 'waiting') return;
    setPhase('uploading');
    try {
      const doc = await scanMutation.mutateAsync();
      setProgress(100); setPhase('received'); setScannedDoc(doc);
      show({ type: 'info', title: 'Document received', message: 'Scanned document synced from mobile device.' });
      setTimeout(() => setStep('preview'), 600);
    } catch { setPhase('waiting'); show({ type: 'error', title: 'Scan failed', message: 'Could not receive document from mobile device.' }); }
  }, [phase, scanMutation, show]);

  const handleConfirm = useCallback(() => { if (scannedDoc) { onScanComplete(scannedDoc); onClose(); } }, [scannedDoc, onScanComplete, onClose]);
  const handleRescan = useCallback(() => { setStep('scan'); setPhase('waiting'); setProgress(0); setScannedDoc(null); }, []);

  const pc: Record<ScanPhase, { label: string; color: string }> = { idle: { label: 'Idle', color: 'text-fg-subtle' }, connecting: { label: 'Connecting…', color: 'text-attention-fg' }, waiting: { label: 'Waiting for mobile scan', color: 'text-accent-fg' }, uploading: { label: 'Receiving document…', color: 'text-done-fg' }, received: { label: 'Document received!', color: 'text-success-fg' } };

  return (
    <Modal open={open} onClose={onClose} title={step === 'scan' ? 'Import from Physical Document' : 'Review Scanned Document'} description={step === 'scan' ? 'Use your phone to scan and transfer a physical document to this workspace.' : 'Review the scanned document below before adding it to your workspace.'} size="lg">
      {step === 'scan' ? (
        <div className="space-y-5">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className={cn('flex items-center gap-1.5 font-medium', pc[phase].color)}>
              {phase === 'connecting' || phase === 'uploading' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : phase === 'received' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ScanLine className="w-3.5 h-3.5" />}
              {pc[phase].label}
            </span>
            <span className="text-border-default">·</span>
            <span className="text-xs text-fg-subtle font-mono">ws://handoff.local</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col items-center justify-center gap-3 p-5 rounded-md bg-canvas-subtle border border-border-default">
              <QRPlaceholder />
              <p className="text-xs text-fg-subtle text-center max-w-[180px]">Scan this code with your phone camera to begin</p>
            </div>
            <div className="space-y-3">
              {STEPS.map((s, i) => {
                const done = (phase === 'uploading' && i < 2) || (phase === 'received' && i < 3);
                const active = phase === 'waiting' && i === 0;
                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className={cn('w-8 h-8 rounded-md flex items-center justify-center shrink-0', done ? 'bg-success-subtle text-success-fg' : active ? 'bg-accent-subtle text-accent-fg' : 'bg-canvas-subtle text-fg-subtle')}>
                      {done ? <CheckCircle2 className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                    </div>
                    <div><p className={cn('text-sm font-medium', done || active ? 'text-fg-default' : 'text-fg-subtle')}>{i + 1}. {s.label}</p><p className="text-xs text-fg-subtle mt-0.5 leading-relaxed">{s.description}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
          {phase === 'uploading' && (
            <div className="space-y-1.5 animate-fade-in">
              <div className="flex items-center justify-between text-xs"><span className="text-fg-muted">Transferring scanned document…</span><span className="text-fg-subtle font-mono">{progress}%</span></div>
              <div className="h-1.5 rounded-full bg-canvas-subtle overflow-hidden"><div className="h-full rounded-full bg-accent-fg transition-all duration-75" style={{ width: `${progress}%` }} /></div>
            </div>
          )}
          <div className="flex flex-col items-center gap-2 pt-3 border-t border-border-muted">
            <button onClick={handleSimulate} disabled={phase !== 'waiting'} className={cn('btn w-full max-w-xs', phase === 'waiting' ? 'btn-primary' : phase === 'received' ? 'bg-success-subtle text-success-fg border-success-fg/20' : 'bg-canvas-subtle text-fg-subtle cursor-not-allowed border-border-default')}>
              {phase === 'uploading' ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Receiving…</> : phase === 'received' ? <><CheckCircle2 className="w-3.5 h-3.5" />Received — loading preview…</> : phase === 'connecting' ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Connecting…</> : <><Smartphone className="w-3.5 h-3.5" />Simulate Mobile Upload</>}
            </button>
            <p className="text-xs text-fg-subtle">For testing: simulates a phone scanning and uploading a document via WebSocket hand-off</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-md bg-accent-subtle border border-accent-muted/30">
            <div className="w-8 h-8 rounded-md bg-canvas-default flex items-center justify-center text-accent-fg shrink-0"><Eye className="w-4 h-4" /></div>
            <div><p className="text-sm font-semibold text-fg-default">Document Preview</p><p className="text-xs text-fg-muted mt-0.5">Review the scanned content below. Click "Add to workspace" to import, or "Rescan" to try again.</p></div>
          </div>
          {scannedDoc && (
            <>
              <div className="flex items-start gap-3 p-3 rounded-md border border-border-default bg-canvas-default">
                <div className="w-16 h-16 rounded-md overflow-hidden bg-canvas-subtle shrink-0"><img src={scannedDoc.thumbnailUrl} alt="Scanned document" className="w-full h-full object-cover" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1"><span className="label-accent"><FileText className="w-2.5 h-2.5" />Article</span><span className="label-neutral">Scanned</span></div>
                  <h3 className="text-sm font-semibold text-fg-default">{scannedDoc.title}</h3>
                  <p className="text-xs text-fg-subtle mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(new Date().toISOString())}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-fg-subtle mb-1"><Tag className="w-3 h-3" />Description</div>
                <p className="text-sm text-fg-muted leading-relaxed p-3 rounded-md bg-canvas-subtle border border-border-muted">{scannedDoc.description}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-fg-subtle mb-1"><FileText className="w-3 h-3" />Extracted Text (OCR)</div>
                <div className="max-h-56 overflow-y-auto p-3 rounded-md bg-canvas-subtle border border-border-muted"><pre className="text-xs text-fg-muted whitespace-pre-wrap font-mono leading-relaxed">{scannedDoc.extractedText}</pre></div>
              </div>
              <div className="flex items-center gap-2 text-xs text-fg-subtle"><span className="font-medium">Source:</span><span className="font-mono truncate">{scannedDoc.sourceUrl}</span></div>
            </>
          )}
          <div className="flex items-center justify-between gap-2 pt-3 border-t border-border-muted">
            <button onClick={handleRescan} className="btn-secondary"><ArrowLeft className="w-3.5 h-3.5" />Rescan</button>
            <button onClick={handleConfirm} className="btn-primary">Add to workspace<ArrowRight className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export type { ScannedDocument };
