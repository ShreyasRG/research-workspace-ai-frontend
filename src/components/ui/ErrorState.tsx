import { CircleAlert as AlertCircle, RefreshCw } from 'lucide-react';
interface ErrorStateProps { message?: string; onRetry?: () => void; }
export function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 rounded-md bg-danger-subtle flex items-center justify-center text-danger-fg mb-3"><AlertCircle className="w-6 h-6" /></div>
      <h3 className="text-sm font-semibold text-fg-default">{message}</h3>
      {onRetry && <button onClick={onRetry} className="btn-secondary mt-4"><RefreshCw className="w-3.5 h-3.5" />Try again</button>}
    </div>
  );
}
