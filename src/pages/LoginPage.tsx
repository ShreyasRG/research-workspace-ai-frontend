import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex.morgan@research.io');
  const [password, setPassword] = useState('demo');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await login(email, password); navigate('/'); };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas-subtle p-4">
      <div className="w-full max-w-xs">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-md bg-fg-default flex items-center justify-center">
            <svg className="w-5 h-5 text-canvas-default" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.2.73.94.83 1.18.2.55.83 1.58 2.26 1.26.03.4.06.78.06 1.17 0 .21-.15.45-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"/></svg>
          </div>
          <span className="text-lg font-semibold text-fg-default">Research Hub</span>
        </div>
        <div className="box p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div><label className="block text-sm font-medium text-fg-default mb-1">Email</label><input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div><label className="block text-sm font-medium text-fg-default mb-1">Password</label><input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
            <p className="text-xs text-fg-subtle text-center">Demo credentials are pre-filled — just click Sign in.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
