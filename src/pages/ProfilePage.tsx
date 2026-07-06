import { useEffect, useState } from 'react';
import { Mail, Calendar, FolderKanban, FileText, Sparkles, Bell, MailOpen, Zap, Cpu, Moon, Sun } from 'lucide-react';
import { useProfile } from '../hooks/queries';
import type { Profile } from '../types';
import { Avatar } from '../components/ui/Avatar';
import { Skeleton } from '../components/ui/Skeleton';
import { useTheme } from '../contexts/ThemeContext';
import { formatDate, cn } from '../utils';

export function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const { data: profile, isLoading } = useProfile();
  const [prefs, setPrefs] = useState<Profile['preferences'] | null>(null);

  useEffect(() => {
    if (profile) setPrefs(profile.preferences);
  }, [profile]);

  if (isLoading || !profile || !prefs) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const stats = [
    { label: 'Total Workspaces', value: profile.totalWorkspaces, icon: FolderKanban, color: 'from-primary-500 to-accent-500' },
    { label: 'Saved Resources', value: profile.savedResources, icon: FileText, color: 'from-emerald-500 to-teal-500' },
    { label: 'AI Summaries Generated', value: profile.aiSummariesGenerated, icon: Sparkles, color: 'from-amber-500 to-orange-500' },
  ];

  const togglePref = (key: keyof Profile['preferences']) => {
    setPrefs((p) => p ? { ...p, [key]: !p[key] } : p);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile header */}
      <div className="card overflow-hidden">
        <div className="h-28 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="px-6 md:px-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <Avatar name={profile.user.name} src={profile.user.avatarUrl} size="xl" className="ring-4 ring-white dark:ring-gray-900" />
            <div className="flex-1 sm:pb-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profile.user.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {profile.user.email}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined {formatDate(profile.user.joinedDate)}</span>
              </div>
            </div>
            <button className="btn-secondary shrink-0">Edit Profile</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center gap-3">
              <div className={cn('w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-sm', s.color)}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="card p-6 md:p-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Manage your preferences and notifications.</p>

        <div className="space-y-1">
          <SettingRow
            icon={<Bell className="w-4 h-4" />}
            title="Email notifications"
            description="Receive emails about activity in your workspaces."
          >
            <Toggle checked={prefs.emailNotifications} onChange={() => togglePref('emailNotifications')} />
          </SettingRow>
          <SettingRow
            icon={<MailOpen className="w-4 h-4" />}
            title="Weekly digest"
            description="A summary of your research activity every Monday."
          >
            <Toggle checked={prefs.weeklyDigest} onChange={() => togglePref('weeklyDigest')} />
          </SettingRow>
          <SettingRow
            icon={<Zap className="w-4 h-4" />}
            title="Auto-generate summaries"
            description="Automatically generate AI summaries when you add a resource."
          >
            <Toggle checked={prefs.autoGenerateSummaries} onChange={() => togglePref('autoGenerateSummaries')} />
          </SettingRow>
          <SettingRow
            icon={<Cpu className="w-4 h-4" />}
            title="Default summary model"
            description="Choose which AI model generates your summaries."
          >
            <select
              value={prefs.defaultSummaryModel}
              onChange={(e) => setPrefs({ ...prefs, defaultSummaryModel: e.target.value })}
              className="input w-auto py-2 text-sm"
            >
              <option value="rw-summarizer-v2">rw-summarizer-v2</option>
              <option value="rw-summarizer-pro">rw-summarizer-pro</option>
              <option value="rw-summarizer-fast">rw-summarizer-fast</option>
            </select>
          </SettingRow>
          <SettingRow
            icon={theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            title="Theme"
            description="Switch between light and dark mode."
          >
            <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <button
                onClick={() => setTheme('light')}
                className={cn('px-3 py-1.5 rounded-md text-sm font-medium transition-colors', theme === 'light' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500')}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={cn('px-3 py-1.5 rounded-md text-sm font-medium transition-colors', theme === 'dark' ? 'bg-gray-900 text-gray-100 shadow-sm' : 'text-gray-400')}
              >
                Dark
              </button>
            </div>
          </SettingRow>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ icon, title, description, children }: { icon: React.ReactNode; title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'relative w-11 h-6 rounded-full transition-colors',
        checked ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700',
      )}
      role="switch"
      aria-checked={checked}
    >
      <span className={cn('absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform', checked && 'translate-x-5')} />
    </button>
  );
}
