import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, LayoutDashboard, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleGoDashboard = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/dashboard';
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-error-100 dark:bg-error-900/30 flex items-center justify-center text-error-600 dark:text-error-400 mx-auto mb-6">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Something went wrong
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">
            An unexpected error occurred. You can try reloading the page or go back to the dashboard.
          </p>
          {this.state.error && (
            <pre className="mt-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400 text-left overflow-x-auto">
              {this.state.error.message}
            </pre>
          )}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={this.handleGoDashboard} className="btn-primary">
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
            </button>
            <button onClick={this.handleReload} className="btn-secondary">
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }
}
