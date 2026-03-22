import { motion } from 'framer-motion';
import PublicLayout from '@/components/layout/PublicLayout';
import { useVideos } from '@/hooks/useSupabaseData';
import { Video, Play } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
const videoCategories: Array<{ label: string; value: 'all' | 'events' | 'lectures' | 'announcements' }> = [
  { label: 'All', value: 'all' },
  { label: 'Events', value: 'events' },
  { label: 'Lectures', value: 'lectures' },
  { label: 'Announcements', value: 'announcements' },
];

export default function VideosPage() {
  const { data: videos, isLoading } = useVideos();
  const [filterCategory, setFilterCategory] = useState<'all' | 'events' | 'lectures' | 'announcements'>('all');
  const filteredVideos = (videos || []).filter(v => filterCategory === 'all' || v.category === filterCategory);

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Video className="w-4 h-4" /> Videos
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold">School Videos</h1>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">Watch highlights from school events, functions, and activities</p>
          </motion.div>
          <div className="flex justify-center mb-8">
            <Select value={filterCategory} onValueChange={(v: 'all' | 'events' | 'lectures' | 'announcements') => setFilterCategory(v)}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                {videoCategories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1,2,3,4].map(i => <div key={i} className="aspect-video bg-muted rounded-xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredVideos.map((v, i) => {
                const embedUrl = v.youtube_url ? getYoutubeEmbedUrl(v.youtube_url) : null;
                return (
                  <motion.div key={v.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="card-hover overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      {embedUrl ? (
                        <iframe src={embedUrl} title={v.title} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                      ) : v.video_url ? (
                        <video src={v.video_url} controls className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold">{v.title}</h3>
                      {v.category && <p className="text-xs text-primary mt-1 capitalize">{v.category}</p>}
                      {v.description && <p className="text-sm text-muted-foreground mt-1">{v.description}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
          {!isLoading && filteredVideos.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Video className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No videos available yet</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
