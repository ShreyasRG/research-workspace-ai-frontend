import { LayoutGrid, List, Grid3x3 } from 'lucide-react';
import { cn } from '../utils';
import type { ViewMode } from '../hooks/useViewMode';

const MODES: { value: ViewMode; icon: typeof LayoutGrid; label: string }[] = [
  { value: 'icon', icon: LayoutGrid, label: 'Icon view' },
  { value: 'list', icon: List, label: 'List view' },
  { value: 'gallery', icon: Grid3x3, label: 'Gallery view' },
];

export function ViewToggle({ viewMode, onChange }: { viewMode: ViewMode; onChange: (mode: ViewMode) => void }) {
  return (
    <div className="inline-flex items-center gap-0.5 p-0.5 rounded-md border border-border-default bg-canvas-subtle">
      {MODES.map(({ value, icon: Icon, label }) => (
        <button key={value} onClick={() => onChange(value)} title={label} aria-label={label}
          className={cn('p-1.5 rounded transition-colors', viewMode === value ? 'bg-canvas-default text-fg-default shadow-sm' : 'text-fg-subtle hover:text-fg-default')}>
          <Icon className="w-3.5 h-3.5" />
        </button>
      ))}
    </div>
  );
}
