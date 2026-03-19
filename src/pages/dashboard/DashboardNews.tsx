import DashboardLayout from '@/components/layout/DashboardLayout';
import { useNews } from '@/hooks/useSupabaseData';
import { Newspaper } from 'lucide-react';

export default function DashboardNews() {
  const { data: news } = useNews();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">News</h1>
        <p className="text-sm text-muted-foreground">Latest school news</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {(news || []).map(item => (
          <div key={item.id} className="card-matte p-5 hover:shadow-lift transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Newspaper className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</span>
            </div>
            <h3 className="font-display font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.excerpt}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
