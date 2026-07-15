import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <div className="w-12 h-12 rounded-md bg-canvas-subtle flex items-center justify-center text-fg-subtle mb-3"><Compass className="w-6 h-6" /></div>
      <h1 className="text-lg font-semibold text-fg-default">Page not found</h1>
      <p className="text-sm text-fg-muted mt-1 max-w-sm">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-secondary mt-4">Back to dashboard</Link>
    </div>
  );
}
