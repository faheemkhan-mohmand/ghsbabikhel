import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTeachers, useNotices, useResults, useLibrary, useSchoolInfo } from '@/hooks/useSupabaseData';
import { Users, BookOpen, Bell, BarChart3, FileText, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminOverview() {
  const { data: teachers } = useTeachers();
  const { data: notices } = useNotices();
  const { data: results } = useResults();
  const { data: library } = useLibrary();
  const { data: si } = useSchoolInfo();

  const stats = [
    { label: 'Students', value: `${si?.total_students || 0}+`, icon: Users, color: 'bg-primary/10 text-primary' },
    { label: 'Teachers', value: teachers?.length || 0, icon: BookOpen, color: 'bg-academic-50 text-academic-900' },
    { label: 'Notices', value: notices?.length || 0, icon: Bell, color: 'bg-gold/10 text-gold' },
    { label: 'Results', value: results?.length || 0, icon: BarChart3, color: 'bg-accent text-accent-foreground' },
    { label: 'Library Items', value: library?.length || 0, icon: FileText, color: 'bg-destructive/10 text-destructive' },
  ];

  const topResults = (results || []).filter(r => r.position <= 3 && r.class_name === '10th');
  const quickActions = [
    { label: 'Add Teacher', path: '/admin/teachers' },
    { label: 'Add Notice', path: '/admin/notices' },
    { label: 'Upload File', path: '/admin/library' },
    { label: 'Publish Result', path: '/admin/results' },
  ];

  return (
    <DashboardLayout isAdmin>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, Admin. Here's an overview.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="card-matte p-5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-display font-bold tabular-nums">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="card-matte p-5 mb-6">
        <h3 className="font-display font-semibold mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Link key={action.path} to={action.path}>
              <Button size="sm" variant="outline" className="btn-press gap-1">
                <PlusCircle className="w-3.5 h-3.5" /> {action.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-matte p-6">
          <h3 className="font-display font-semibold mb-4">Recent Notices</h3>
          <div className="space-y-3">
            {(notices || []).slice(0, 3).map(n => (
              <div key={n.id} className="flex items-center gap-3 text-sm">
                <Bell className="w-4 h-4 text-primary shrink-0" />
                <span className="truncate flex-1">{n.title}</span>
                <span className="text-xs text-muted-foreground shrink-0">{new Date(n.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-matte p-6">
          <h3 className="font-display font-semibold mb-4">Top Students</h3>
          <div className="space-y-3">
            {topResults.map(r => (
              <div key={r.id} className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  {r.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <span className="flex-1">{r.name}</span>
                <span className="font-semibold tabular-nums">{Number(r.percentage).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
