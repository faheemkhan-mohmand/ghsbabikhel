import PublicLayout from '@/components/layout/PublicLayout';
import { useAlbums } from '@/hooks/useSupabaseData';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function GalleryPage() {
  const { data: albums } = useAlbums();

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
              <motion.div key={album.id} {...fadeUp} transition={{ delay: i * 0.05 }} className="card-matte overflow-hidden hover:shadow-lift transition-shadow cursor-pointer group">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  {album.cover_image_url ? (
                    <img src={album.cover_image_url} alt={album.name} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-muted-foreground/20 group-hover:scale-110 transition-transform" />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold">{album.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{album.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
