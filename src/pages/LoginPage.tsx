import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { ROUTES } from '../constants';

export function LoginPage() {
  const { login, loginWithGoogle, loginWithGithub, loginAsDemo } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex.morgan@research.io');
  const [password, setPassword] = useState('demo1234');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<'email' | 'google' | 'github' | 'demo' | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading('email');
    try {
      await login(email, password);
      show({ type: 'success', title: 'Welcome back!', message: 'You are now signed in.' });
      navigate(ROUTES.DASHBOARD);
    } catch {
      show({ type: 'error', title: 'Sign in failed', message: 'Please check your credentials.' });
    } finally {
      setLoading(null);
    }
  };

  const handleSocial = async (provider: 'google' | 'github') => {
  setLoading(provider);
  try {
    if (provider === 'google') await loginWithGoogle();
    else await loginWithGithub();
    
    // Smooth, universal text that works perfectly for both paths
    show({ 
      type: 'success', 
      title: 'Signing you in...' 
    });
    
    navigate(ROUTES.DASHBOARD);
  } catch {
    show({ type: 'error', title: 'Authentication failed' });
  } finally {
    setLoading(null);
  }
};

  const handleDemo = async () => {
    setLoading('demo');
    try {
      await loginAsDemo();
      show({ type: 'success', title: 'Demo mode active', message: 'Explore the workspace with sample data.' });
      navigate(ROUTES.DASHBOARD);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)', backgroundSize: '40px 40px, 60px 60px' }} />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-accent-400/20 blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">Research Workspace</span>
          </div>
          <div className="max-w-md">
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
              Your AI-powered research, beautifully organized.
            </h1>
            <p className="text-lg text-primary-100 mt-6 leading-relaxed">
              Collect articles, videos, and notes. Generate AI summaries with key takeaways,
              quotes, and follow-up questions — all in one workspace.
            </p>
            <div className="flex items-center gap-6 mt-10">
              <div>
                <p className="text-3xl font-bold">113+</p>
                <p className="text-sm text-primary-200">Resources saved</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-3xl font-bold">84</p>
                <p className="text-sm text-primary-200">AI summaries</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-3xl font-bold">4</p>
                <p className="text-sm text-primary-200">Workspaces</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-primary-200/80">© 2025 Research Workspace. Built for researchers, by researchers.</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50 dark:bg-gray-950">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white shadow-sm">
              <Brain className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Research Workspace</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome back</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
            Sign in to your account to continue your research.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="input pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <span className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${remember ? 'bg-primary-600 border-primary-600' : 'border-gray-300 dark:border-gray-600 group-hover:border-primary-400'}`}>
                  {remember && (
                    <svg viewBox="0 0 12 12" className="w-3 h-3 text-white" fill="none">
                      <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <input type="checkbox" className="sr-only" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <span className="text-sm text-gray-600 dark:text-gray-300">Remember me</span>
              </label>
              <button type="button" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">
                Forgot password?
              </button>
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading === 'email'}>
              {loading === 'email' ? 'Signing in…' : 'Sign in'}
              {loading !== 'email' && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gray-50 dark:bg-gray-950 text-xs text-gray-400 dark:text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocial('google')}
              disabled={loading !== null}
              className="btn-secondary w-full"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocial('github')}
              disabled={loading !== null}
              className="btn-secondary w-full"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          <button
            onClick={handleDemo}
            disabled={loading !== null}
            className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors border border-primary-200 dark:border-primary-800"
          >
            <Sparkles className="w-4 h-4" />
            {loading === 'demo' ? 'Loading demo…' : 'Continue as Demo User'}
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            Don't have an account?{' '}
            <button className="font-medium text-primary-600 dark:text-primary-400 hover:underline">
              Sign up for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
