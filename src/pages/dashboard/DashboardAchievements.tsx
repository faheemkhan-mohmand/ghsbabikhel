import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAchievements } from '@/hooks/useSupabaseData';
import { Trophy } from 'lucide-react';

export default function DashboardAchievements() {
  const { data: achievements } = useAchievements();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Achievements</h1>
        <p className="text-sm text-muted-foreground">School milestones</p>
      </div>
      <div className="space-y-4">
        {(achievements || []).map(a => (
          <div key={a.id} className="card-matte p-5 hover:shadow-lift transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm">{a.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{a.category}</span>
                  <span className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
