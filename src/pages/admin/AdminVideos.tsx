import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useVideos, useMutateVideo, uploadFile, VideoItem } from '@/hooks/useSupabaseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Video, Play } from 'lucide-react';
import { toast } from 'sonner';

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

const videoCategories: Array<{ label: string; value: 'events' | 'lectures' | 'announcements' }> = [
  { label: 'Events', value: 'events' },
  { label: 'Lectures', value: 'lectures' },
  { label: 'Announcements', value: 'announcements' },
];

export default function AdminVideos() {
  const { data: videos } = useVideos();
  const { upsert, remove } = useMutateVideo();
  const [editing, setEditing] = useState<VideoItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<'all' | 'events' | 'lectures' | 'announcements'>('all');
  const [form, setForm] = useState({ title: '', description: '', youtube_url: '', category: 'events' as 'events' | 'lectures' | 'announcements' });
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const openAdd = () => { setEditing(null); setForm({ title: '', description: '', youtube_url: '', category: 'events' }); setVideoFile(null); setIsOpen(true); };
  const openEdit = (v: VideoItem) => { setEditing(v); setForm({ title: v.title, description: v.description || '', youtube_url: v.youtube_url || '', category: (v.category as any) || 'events' }); setVideoFile(null); setIsOpen(true); };

  const handleSave = async () => {
    if (!form.title) return;
    try {
      let video_url = editing?.video_url;
      if (videoFile) {
        video_url = await uploadFile('videos', `${Date.now()}_${videoFile.name}`, videoFile);
      }
      await upsert.mutateAsync({
        title: form.title,
        description: form.description,
        category: form.category,
        youtube_url: form.youtube_url || undefined,
        video_url,
        ...(editing ? { id: editing.id } : {}),
      });
      toast.success(editing ? 'Video updated' : 'Video added');
      setIsOpen(false);
    } catch (e: any) { toast.error(e.message); }
  };

  const handleDelete = async (id: string) => {
    try { await remove.mutateAsync(id); toast.success('Deleted'); } catch (e: any) { toast.error(e.message); }
  };

  const filteredVideos = (videos || []).filter(v => filterCategory === 'all' || v.category === filterCategory);

  return (
    <DashboardLayout isAdmin>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Manage Videos</h1>
          <p className="text-sm text-muted-foreground">{videos?.length || 0} videos</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="btn-press gap-1" onClick={openAdd}><Plus className="w-4 h-4" /> Add Video</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? 'Edit Video' : 'Add Video'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="mt-1" /></div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="mt-1" rows={3} /></div>
              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v: 'events' | 'lectures' | 'announcements') => setForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {videoCategories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>YouTube URL (optional)</Label><Input value={form.youtube_url} onChange={e => setForm(f => ({ ...f, youtube_url: e.target.value }))} placeholder="https://youtube.com/watch?v=..." className="mt-1" /></div>
              <div><Label>Or Upload Video</Label><Input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files?.[0] || null)} className="mt-1" /></div>
              <Button onClick={handleSave} className="w-full btn-press" disabled={upsert.isPending}>{upsert.isPending ? 'Saving...' : 'Save'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-4">
        <Select value={filterCategory} onValueChange={(v: 'all' | 'events' | 'lectures' | 'announcements') => setFilterCategory(v)}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {videoCategories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {filteredVideos.map(v => {
          const embedUrl = v.youtube_url ? getYoutubeEmbedUrl(v.youtube_url) : null;
          return (
            <div key={v.id} className="card-matte overflow-hidden">
              <div className="aspect-video bg-muted">
                {embedUrl ? (
                  <iframe src={embedUrl} title={v.title} className="w-full h-full" allowFullScreen />
                ) : v.video_url ? (
                  <video src={v.video_url} controls className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><Play className="w-12 h-12 text-muted-foreground/30" /></div>
                )}
              </div>
              <div className="p-4 flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-sm">{v.title}</h3>
                  {v.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{v.description}</p>}
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(v)}><Pencil className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(v.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
