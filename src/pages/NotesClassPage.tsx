import { useParams, Link } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import { getClassData } from '@/data/notesData';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import NotFound from './NotFound';

export default function NotesClassPage() {
  const { classNumber } = useParams<{ classNumber: string }>();
  const num = parseInt(classNumber || '0');
  const cls = getClassData(num);

  if (!cls) return <NotFound />;

  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-12 md:py-16" style={{ background: `linear-gradient(135deg, ${cls.color}, ${cls.color}CC)` }}>
        <div className="container-main text-white">
          <Link to="/notes" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Classes
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{cls.emoji}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold">Class {cls.classNumber}</h1>
                <p className="text-white/80">{cls.subjects.length} subjects available</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-main">
          <h2 className="text-2xl font-display font-bold text-foreground mb-8">Select a Subject</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cls.subjects.map((subject, i) => (
              <motion.div
                key={subject.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <Link
                  to={`/notes/class-${cls.classNumber}/${subject.slug}`}
                  className="group block rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="h-3" style={{ backgroundColor: subject.color }} />
                  <div className="p-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${subject.color}15` }}
                    >
                      {subject.emoji}
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {subject.chapters.length} Chapters
                    </p>
                    <div className="mt-4 text-sm font-medium transition-colors" style={{ color: subject.color }}>
                      Start Learning →
                    </div>
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
