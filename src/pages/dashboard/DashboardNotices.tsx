import DashboardLayout from '@/components/layout/DashboardLayout';
import { useNotices } from '@/hooks/useSupabaseData';
import { Bell } from 'lucide-react';

export default function DashboardNotices() {
  const { data: notices } = useNotices();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Notices</h1>
        <p className="text-sm text-muted-foreground">School announcements</p>
      </div>
      <div className="space-y-4">
        {(notices || []).map(notice => (
          <div key={notice.id} className="card-matte p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-sm">{notice.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${notice.priority === 'high' ? 'bg-destructive/10 text-destructive' : notice.priority === 'medium' ? 'bg-gold/10 text-gold' : 'bg-muted text-muted-foreground'}`}>{notice.priority}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notice.content}</p>
                <p className="text-xs text-muted-foreground mt-2">{new Date(notice.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
