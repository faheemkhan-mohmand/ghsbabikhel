import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAlbums, useMutateAlbum, uploadFile, Album } from '@/hooks/useSupabaseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminGallery() {
  const { data: albums } = useAlbums();
  const { upsert, remove } = useMutateAlbum();
  const [editing, setEditing] = useState<Album | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const openAdd = () => { setEditing(null); setForm({ name: '', description: '' }); setCoverFile(null); setIsOpen(true); };
  const openEdit = (a: Album) => { setEditing(a); setForm({ name: a.name, description: a.description || '' }); setCoverFile(null); setIsOpen(true); };

  const handleSave = async () => {
    if (!form.name) return;
    try {
      let cover_image_url = editing?.cover_image_url;
      if (coverFile) {
        cover_image_url = await uploadFile('gallery', `covers/${Date.now()}_${coverFile.name}`, coverFile);
      }
      await upsert.mutateAsync({ ...form, cover_image_url, ...(editing ? { id: editing.id } : {}) });
      toast.success(editing ? 'Album updated' : 'Album created');
      setIsOpen(false);
    } catch (e: any) { toast.error(e.message); }
  };

  const handleDelete = async (id: string) => {
    try { await remove.mutateAsync(id); toast.success('Deleted'); } catch (e: any) { toast.error(e.message); }
  };

  return (
    <DashboardLayout isAdmin>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Manage Gallery</h1>
          <p className="text-sm text-muted-foreground">{albums?.length || 0} albums</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="btn-press gap-1" onClick={openAdd}><Plus className="w-4 h-4" /> Create Album</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? 'Edit Album' : 'Create Album'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Album Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1" /></div>
              <div><Label>Description</Label><Input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="mt-1" /></div>
              <div><Label>Cover Image</Label><Input type="file" accept="image/*" onChange={e => setCoverFile(e.target.files?.[0] || null)} className="mt-1" /></div>
              <Button onClick={handleSave} className="w-full btn-press" disabled={upsert.isPending}>{upsert.isPending ? 'Saving...' : 'Save'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(albums || []).map(album => (
          <div key={album.id} className="card-matte overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              {album.cover_image_url ? (
                <img src={album.cover_image_url} alt={album.name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-10 h-10 text-muted-foreground/20" />
              )}
            </div>
            <div className="p-4 flex items-start justify-between">
              <div>
                <h3 className="font-display font-semibold text-sm">{album.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{album.description}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => openEdit(album)}><Pencil className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(album.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
