import { useState } from 'react';
import { Save, MapPin, Globe, Twitter, Github } from 'lucide-react';
import { useProfile } from '../hooks/queries';
import { useUpdateProfile } from '../hooks/mutations';
import { useToast } from '../contexts/ToastContext';
import { Avatar } from '../components/ui/Avatar';
import { CardGridSkeleton } from '../components/ui/Skeleton';
import { cn } from '../utils';

export function ProfilePage() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const { show } = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', bio: '', location: '', website: '', twitter: '', github: '' });
  const [prefs, setPrefs] = useState({ emailNotifications: true, pushNotifications: false, weeklyDigest: true, productUpdates: true });

  if (isLoading || !profile) return <CardGridSkeleton count={3} />;

  const startEdit = () => { setForm({ name: profile.name, bio: profile.bio, location: profile.location, website: profile.website, twitter: profile.twitter, github: profile.github }); setPrefs(profile.notificationPreferences); setEditing(true); };
  const handleSave = async () => { await updateProfile.mutateAsync({ ...form, notificationPreferences: prefs }); show({ type: 'success', title: 'Profile updated', message: 'Your changes have been saved.' }); setEditing(false); };

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-fg-default">Profile</h1>
        {editing ? (<div className="flex gap-2"><button onClick={() => setEditing(false)} className="btn-secondary btn-sm">Cancel</button><button onClick={handleSave} className="btn-primary btn-sm" disabled={updateProfile.isPending}><Save className="w-3.5 h-3.5" />{updateProfile.isPending ? 'Saving…' : 'Save'}</button></div>) : <button onClick={startEdit} className="btn-secondary btn-sm">Edit profile</button>}
      </div>
      <div className="box p-4 mb-4">
        <div className="flex items-start gap-3"><Avatar src={profile.avatarUrl} alt={profile.name} size="lg" /><div className="flex-1 min-w-0">{editing ? <input className="input mb-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /> : <h2 className="text-lg font-bold text-fg-default">{profile.name}</h2>}<p className="text-sm text-fg-subtle">{profile.email}</p></div></div>
        <div className="mt-3"><label className="block text-xs font-medium text-fg-subtle mb-1">Bio</label>{editing ? <textarea className="input min-h-[72px] resize-none" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /> : <p className="text-sm text-fg-muted">{profile.bio}</p>}</div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {([['Location', 'location', MapPin], ['Website', 'website', Globe], ['Twitter', 'twitter', Twitter], ['GitHub', 'github', Github]] as const).map(([label, key, Icon]) => (
            <div key={key}><label className="flex items-center gap-1 text-xs font-medium text-fg-subtle mb-1"><Icon className="w-3 h-3" />{label}</label>{editing ? <input className="input" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} /> : <p className="text-sm text-fg-muted">{profile[key]}</p>}</div>
          ))}
        </div>
        <div className="mt-3"><label className="block text-xs font-medium text-fg-subtle mb-1.5">Interests</label><div className="flex flex-wrap gap-1.5">{profile.interests.map((interest) => <span key={interest} className="label-accent">{interest}</span>)}</div></div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatBox label="Resources read" value={profile.stats.resourcesRead} /><StatBox label="Summaries" value={profile.stats.summariesGenerated} /><StatBox label="Workspaces" value={profile.stats.workspacesCreated} /><StatBox label="Reading time" value={`${Math.floor(profile.stats.totalReadingTimeMinutes / 60)}h`} />
      </div>
      <div className="box p-4 mb-4">
        <h3 className="text-sm font-semibold text-fg-default mb-3">Reading goals</h3>
        <div className="flex items-center justify-between mb-1.5"><span className="text-sm text-fg-muted">This week</span><span className="text-sm font-medium text-fg-default">{profile.readingGoals.currentWeek} / {profile.readingGoals.weeklyTarget}</span></div>
        <div className="h-1.5 rounded-full bg-canvas-subtle overflow-hidden"><div className="h-full rounded-full bg-success-fg" style={{ width: `${(profile.readingGoals.currentWeek / profile.readingGoals.weeklyTarget) * 100}%` }} /></div>
        <p className="text-xs text-fg-subtle mt-1.5">{profile.readingGoals.streak} week streak — keep it up!</p>
      </div>
      <div className="box p-4">
        <h3 className="text-sm font-semibold text-fg-default mb-3">Notification preferences</h3>
        <div className="space-y-2.5">
          {([['emailNotifications', 'Email notifications'], ['pushNotifications', 'Push notifications'], ['weeklyDigest', 'Weekly digest'], ['productUpdates', 'Product updates']] as const).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between cursor-pointer"><span className="text-sm text-fg-muted">{label}</span><button onClick={() => editing && setPrefs({ ...prefs, [key]: !prefs[key] })} disabled={!editing} className={cn('w-9 h-5 rounded-full transition-colors relative', (editing ? prefs[key] : profile.notificationPreferences[key]) ? 'bg-accent-fg' : 'bg-border-default')}><span className={cn('absolute top-0.5 w-4 h-4 rounded-full bg-canvas-default shadow-sm transition-transform', (editing ? prefs[key] : profile.notificationPreferences[key]) ? 'translate-x-4' : 'translate-x-0.5')} /></button></label>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return <div className="box p-3"><p className="text-lg font-bold text-fg-default">{value}</p><p className="text-xs text-fg-subtle mt-0.5">{label}</p></div>;
}
