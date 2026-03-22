import DashboardLayout from '@/components/layout/DashboardLayout';
import { useVideos } from '@/hooks/useSupabaseData';
import { Video, Play } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const videoCategories: Array<{ label: string; value: 'all' | 'events' | 'lectures' | 'announcements' }> = [
  { label: 'All', value: 'all' },
  { label: 'Events', value: 'events' },
  { label: 'Lectures', value: 'lectures' },
  { label: 'Announcements', value: 'announcements' },
];

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function DashboardVideos() {
  const { data: videos, isLoading } = useVideos();
  const [filterCategory, setFilterCategory] = useState<'all' | 'events' | 'lectures' | 'announcements'>('all');
  const filteredVideos = (videos || []).filter(v => filterCategory === 'all' || v.category === filterCategory);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Videos</h1>
        <p className="text-sm text-muted-foreground">Watch school event videos</p>
      </div>
      <div className="mb-4">
        <Select value={filterCategory} onValueChange={(v: 'all' | 'events' | 'lectures' | 'announcements') => setFilterCategory(v)}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            {videoCategories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1,2].map(i => <div key={i} className="aspect-video bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredVideos.map(v => {
            const embedUrl = v.youtube_url ? getYoutubeEmbedUrl(v.youtube_url) : null;
            return (
              <div key={v.id} className="card-matte overflow-hidden">
                <div className="aspect-video bg-muted">
                  {embedUrl ? (
                    <iframe src={embedUrl} title={v.title} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  ) : v.video_url ? (
                    <video src={v.video_url} controls className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><Play className="w-12 h-12 text-muted-foreground/30" /></div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold">{v.title}</h3>
                  {v.category && <p className="text-xs text-primary mt-1 capitalize">{v.category}</p>}
                  {v.description && <p className="text-sm text-muted-foreground mt-1">{v.description}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!isLoading && filteredVideos.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Video className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No videos available yet</p>
        </div>
      )}
    </DashboardLayout>
  );
}
