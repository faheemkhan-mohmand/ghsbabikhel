import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockAlbums } from '@/data/mockData';
import { Image as ImageIcon } from 'lucide-react';

export default function DashboardGallery() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Gallery</h1>
        <p className="text-sm text-muted-foreground">School photo albums</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAlbums.map(album => (
          <div key={album.id} className="card-matte overflow-hidden hover:shadow-lift transition-shadow cursor-pointer group">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-muted-foreground/20 group-hover:scale-110 transition-transform" />
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
