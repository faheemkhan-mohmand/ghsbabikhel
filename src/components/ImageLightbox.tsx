import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

export default function ImageLightbox({ src, alt, onClose }: Props) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <button className="absolute top-4 right-4 text-white/80 hover:text-white p-2" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            src={src}
            alt={alt || ''}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
