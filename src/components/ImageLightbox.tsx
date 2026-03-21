import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  src?: string | null;
  alt?: string;
  images?: { src: string; alt: string }[];
  currentIndex?: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function ImageLightbox({ src, alt, images, currentIndex, onClose, onPrev, onNext }: Props) {
  const currentSrc = images && currentIndex !== undefined ? images[currentIndex]?.src : src;
  const currentAlt = images && currentIndex !== undefined ? images[currentIndex]?.alt : alt;

  return (
    <AnimatePresence>
      {currentSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <button className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
          {onPrev && (
            <button className="absolute left-4 text-white/80 hover:text-white p-2 z-10" onClick={e => { e.stopPropagation(); onPrev(); }}>
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}
          {onNext && (
            <button className="absolute right-4 text-white/80 hover:text-white p-2 z-10" onClick={e => { e.stopPropagation(); onNext(); }}>
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
          <motion.img
            key={currentSrc}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            src={currentSrc}
            alt={currentAlt || ''}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
