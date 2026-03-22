import DashboardLayout from '@/components/layout/DashboardLayout';
import { useLibrary } from '@/hooks/useSupabaseData';
import { FileText, FileIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLibrary() {
  const { data: library } = useLibrary();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Library</h1>
        <p className="text-sm text-muted-foreground">Access study materials</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(library || []).map(item => (
          <div key={item.id} className="card-matte p-5 hover:shadow-lift transition-shadow">
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.file_type === 'pdf' ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                {item.file_type === 'pdf' ? <FileText className="w-4 h-4 text-destructive" /> : <FileIcon className="w-4 h-4 text-primary" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-sm">{item.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{item.subject}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground uppercase">{item.file_type}</span>
                </div>
                {item.file_url ? (
                  <a href={item.file_url} target="_blank" rel="noopener noreferrer" download>
                    <Button size="sm" variant="outline" className="btn-press gap-1 text-xs mt-3"><Download className="w-3 h-3" /> Download</Button>
                  </a>
                ) : (
                  <Button size="sm" variant="outline" className="btn-press gap-1 text-xs mt-3" disabled><Download className="w-3 h-3" /> No file</Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
