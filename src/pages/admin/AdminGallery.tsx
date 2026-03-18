import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockAlbums, Album } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminGallery() {
  const [albums, setAlbums] = useState<Album[]>(mockAlbums);
  const [editing, setEditing] = useState<Album | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });

  const openAdd = () => { setEditing(null); setForm({ name: '', description: '' }); setIsOpen(true); };
  const openEdit = (a: Album) => { setEditing(a); setForm({ name: a.name, description: a.description }); setIsOpen(true); };

  const handleSave = () => {
    if (!form.name) return;
    if (editing) {
      setAlbums(prev => prev.map(a => a.id === editing.id ? { ...a, ...form } : a));
      toast.success('Album updated');
    } else {
      setAlbums(prev => [...prev, { id: Date.now().toString(), ...form, coverImage: '', images: [] }]);
      toast.success('Album created');
    }
    setIsOpen(false);
  };

  return (
    <DashboardLayout isAdmin>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Manage Gallery</h1>
          <p className="text-sm text-muted-foreground">{albums.length} albums</p>
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
              <p className="text-xs text-muted-foreground">Image upload will be available with Supabase Storage integration.</p>
              <Button onClick={handleSave} className="w-full btn-press">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums.map(album => (
          <div key={album.id} className="card-matte overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-muted-foreground/20" />
            </div>
            <div className="p-4 flex items-start justify-between">
              <div>
                <h3 className="font-display font-semibold text-sm">{album.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{album.description}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => openEdit(album)}><Pencil className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => { setAlbums(p => p.filter(x => x.id !== album.id)); toast.success('Deleted'); }} className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
