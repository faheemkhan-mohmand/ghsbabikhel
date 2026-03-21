import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import { useAlbums, useGalleryImages } from '@/hooks/useSupabaseData';
import { motion } from 'framer-motion';
import { Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageLightbox from '@/components/ImageLightbox';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function GalleryPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { data: albums } = useAlbums();
  const { data: images } = useGalleryImages(albumId);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Album detail view
  if (albumId) {
    const album = albums?.find(a => a.id === albumId);
    const imgs = images || [];
    return (
      <PublicLayout>
        <section className="section-padding">
          <div className="container-main">
            <div className="flex items-center gap-3 mb-8">
              <Button variant="ghost" size="sm" onClick={() => navigate('/gallery')}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
              <div>
                <h1 className="text-3xl font-display font-extrabold">{album?.name || 'Album'}</h1>
                <p className="text-muted-foreground">{imgs.length} photos</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imgs.map((img, i) => (
                <motion.div key={img.id} {...fadeUp} transition={{ delay: i * 0.03 }}>
                  <img
                    src={img.image_url} alt={img.caption || ''}
                    className="w-full aspect-square object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform shadow-matte"
                    onClick={() => setLightboxIdx(i)}
                  />
                </motion.div>
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
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h1 className="text-4xl font-display font-extrabold mb-4">Photo Gallery</h1>
            <p className="text-muted-foreground text-lg">Capturing moments at GHS Babi Khel</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(albums || []).map((album, i) => (
              <motion.div key={album.id} {...fadeUp} transition={{ delay: i * 0.05 }}>
                <Link to={`/gallery/${album.id}`} className="card-matte overflow-hidden hover:shadow-lift transition-shadow cursor-pointer group block">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    {album.cover_image_url ? (
                      <img src={album.cover_image_url} alt={album.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-muted-foreground/20 group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold">{album.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{album.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
