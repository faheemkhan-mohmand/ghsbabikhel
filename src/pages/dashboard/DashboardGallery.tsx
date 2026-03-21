import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAlbums, useGalleryImages } from '@/hooks/useSupabaseData';
import { Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageLightbox from '@/components/ImageLightbox';

export default function DashboardGallery() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { data: albums } = useAlbums();
  const { data: images } = useGalleryImages(albumId);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (albumId) {
    const album = albums?.find(a => a.id === albumId);
    const imgs = images || [];
    return (
      <DashboardLayout>
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/gallery')}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
          <div>
            <h1 className="text-2xl font-display font-bold">{album?.name || 'Album'}</h1>
            <p className="text-sm text-muted-foreground">{imgs.length} images</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imgs.map((img, i) => (
            <img
              key={img.id} src={img.image_url} alt={img.caption || ''}
              className="w-full aspect-square object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setLightboxIdx(i)}
            />
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

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Gallery</h1>
        <p className="text-sm text-muted-foreground">School photo albums</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(albums || []).map(album => (
          <div key={album.id} className="card-matte overflow-hidden hover:shadow-lift transition-shadow cursor-pointer group" onClick={() => navigate(`/dashboard/gallery/${album.id}`)}>
            <div className="aspect-video bg-muted flex items-center justify-center">
              {album.cover_image_url ? (
                <img src={album.cover_image_url} alt={album.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <ImageIcon className="w-10 h-10 text-muted-foreground/20 group-hover:scale-110 transition-transform" />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-display font-semibold text-sm">{album.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{album.description}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
