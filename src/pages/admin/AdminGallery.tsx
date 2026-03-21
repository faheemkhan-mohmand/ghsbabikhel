import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAlbums, useGalleryImages, useMutateAlbum, useMutateGalleryImage, uploadFile, Album } from '@/hooks/useSupabaseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Image as ImageIcon, ArrowLeft, Upload } from 'lucide-react';
import { toast } from 'sonner';
import ImageLightbox from '@/components/ImageLightbox';

export default function AdminGallery() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { data: albums } = useAlbums();
  const { data: images } = useGalleryImages(albumId);
  const { upsert: upsertAlbum, remove: removeAlbum } = useMutateAlbum();
  const { add: addImage, remove: removeImage } = useMutateGalleryImage();
  const [editing, setEditing] = useState<Album | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openAdd = () => { setEditing(null); setForm({ name: '', description: '' }); setCoverFile(null); setIsOpen(true); };
  const openEdit = (a: Album) => { setEditing(a); setForm({ name: a.name, description: a.description || '' }); setCoverFile(null); setIsOpen(true); };

  const handleSaveAlbum = async () => {
    if (!form.name) return;
    try {
      let cover_image_url = editing?.cover_image_url;
      if (coverFile) cover_image_url = await uploadFile('gallery', `covers/${Date.now()}_${coverFile.name}`, coverFile);
      await upsertAlbum.mutateAsync({ ...form, cover_image_url, ...(editing ? { id: editing.id } : {}) });
      toast.success(editing ? 'Album updated' : 'Album created');
      setIsOpen(false);
    } catch (e: any) { toast.error(e.message); }
  };

  const handleDeleteAlbum = async (id: string) => {
    try { await removeAlbum.mutateAsync(id); toast.success('Deleted'); } catch (e: any) { toast.error(e.message); }
  };

  const handleUploadImages = async (files: FileList) => {
    if (!albumId) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const url = await uploadFile('gallery', `images/${Date.now()}_${file.name}`, file);
        await addImage.mutateAsync({ album_id: albumId, image_url: url, caption: file.name });
      }
      toast.success(`${files.length} image(s) uploaded`);
    } catch (e: any) { toast.error(e.message); }
    setUploading(false);
  };

  const handleDeleteImage = async (id: string) => {
    try { await removeImage.mutateAsync(id); toast.success('Deleted'); } catch (e: any) { toast.error(e.message); }
  };

  // Album detail view
  if (albumId) {
    const album = albums?.find(a => a.id === albumId);
    const imgs = images || [];
    return (
      <DashboardLayout isAdmin>
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/gallery')}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
          <div className="flex-1">
            <h1 className="text-2xl font-display font-bold">{album?.name || 'Album'}</h1>
            <p className="text-sm text-muted-foreground">{imgs.length} images</p>
          </div>
          <label className="cursor-pointer">
            <Button className="btn-press gap-1 pointer-events-none" disabled={uploading}>
              <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload Images'}
            </Button>
            <input type="file" accept="image/*" multiple className="hidden" onChange={e => e.target.files && handleUploadImages(e.target.files)} />
          </label>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imgs.map((img, i) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden">
              <img
                src={img.image_url} alt={img.caption || ''}
                className="w-full aspect-square object-cover cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setLightboxIdx(i)}
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="destructive" size="sm" onClick={() => handleDeleteImage(img.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
        {lightboxIdx !== null && (
          <ImageLightbox
            images={imgs.map(i => ({ src: i.image_url, alt: i.caption || '' }))}
            currentIndex={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onPrev={() => setLightboxIdx(i => i !== null && i > 0 ? i - 1 : (imgs.length - 1))}
            onNext={() => setLightboxIdx(i => i !== null && i < imgs.length - 1 ? i + 1 : 0)}
          />
        )}
      </DashboardLayout>
    );
  }

  // Albums list
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
              <Button onClick={handleSaveAlbum} className="w-full btn-press" disabled={upsertAlbum.isPending}>{upsertAlbum.isPending ? 'Saving...' : 'Save'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(albums || []).map(album => (
          <div key={album.id} className="card-matte overflow-hidden cursor-pointer" onClick={() => navigate(`/admin/gallery/${album.id}`)}>
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
              <div className="flex gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                <Button variant="ghost" size="sm" onClick={() => openEdit(album)}><Pencil className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteAlbum(album.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
