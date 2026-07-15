import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils';

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroupProps {
  title?: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
  defaultOpen?: boolean;
}

export function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  defaultOpen = true,
}: FilterGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 py-4">
      <button
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 dark:text-gray-100"
        onClick={() => setOpen((o) => !o)}
      >
        {title}
        <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="mt-3 space-y-2">
          {options.map((opt) => {
            const checked = selected.includes(opt.value);
            return (
              <label
                key={opt.value}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <span
                  className={cn(
                    'w-4 h-4 rounded border flex items-center justify-center transition-colors',
                    checked
                      ? 'bg-primary-600 border-primary-600'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-primary-400',
                  )}
                >
                  {checked && (
                    <svg viewBox="0 0 12 12" className="w-3 h-3 text-white" fill="none">
                      <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => onToggle(opt.value)}
                />
                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface FilterPanelProps {
  groups: {
    title: string;
    options: FilterOption[];
    selected: string[];
    onToggle: (value: string) => void;
  }[];
  onClearAll: () => void;
  activeCount: number;
}

export function FilterPanel({ groups, onClearAll, activeCount }: FilterPanelProps) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
        {activeCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>
      {groups.map((g) => (
        <FilterGroup
          key={g.title}
          title={g.title}
          options={g.options}
          selected={g.selected}
          onToggle={g.onToggle}
        />
      ))}
    </div>
  );
}
