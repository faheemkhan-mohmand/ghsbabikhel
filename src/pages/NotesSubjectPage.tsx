import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import { getClassData, getSubjectData } from '@/data/notesData';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Circle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import NotFound from './NotFound';

export default function NotesSubjectPage() {
  const { classNumber, subject: subjectSlug } = useParams<{ classNumber: string; subject: string }>();
  const num = parseInt(classNumber || '0');
  const cls = getClassData(num);
  const subject = getSubjectData(num, subjectSlug || '');

  const [completed, setCompleted] = useState<Set<number>>(() => {
    const stored = localStorage.getItem(`notes-completed-${num}-${subjectSlug}`);
    return stored ? new Set(JSON.parse(stored)) : new Set<number>();
  });

  if (!cls || !subject) return <NotFound />;

  const toggleComplete = (chapterId: number) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(chapterId)) next.delete(chapterId);
      else next.add(chapterId);
      localStorage.setItem(`notes-completed-${num}-${subjectSlug}`, JSON.stringify([...next]));
      return next;
    });
  };

  const progressPercent = Math.round((completed.size / subject.chapters.length) * 100);

  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-10 md:py-14" style={{ background: `linear-gradient(135deg, ${subject.color}, ${subject.color}CC)` }}>
        <div className="container-main text-white">
          <Link
            to={`/notes/class-${num}`}
            className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Class {num} Subjects
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{subject.emoji}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold">{subject.name}</h1>
                <p className="text-white/80">Class {num} • {subject.chapters.length} Chapters</p>
              </div>
            </div>
            {/* Progress */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 max-w-lg">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progress</span>
                <span className="font-semibold">{completed.size} of {subject.chapters.length} completed</span>
              </div>
              <Progress value={progressPercent} className="h-2.5 bg-white/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-10 md:py-16 bg-white min-h-[50vh]">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subject.chapters.map((chapter, i) => {
              const isDone = completed.has(chapter.id);
              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={`group relative rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    isDone ? 'border-green-200 bg-green-50/50' : 'border-border/60 bg-white'
                  }`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: subject.color }}
                    >
                      Ch {chapter.id}
                    </span>
                    <button onClick={() => toggleComplete(chapter.id)} className="transition-transform hover:scale-110">
                      {isDone ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground/40" />
                      )}
                    </button>
                  </div>

                  <h3 className="font-display font-bold text-foreground text-base mb-1.5">{chapter.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{chapter.description}</p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {chapter.readTime}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Chapter {chapter.id}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 text-xs" style={{ backgroundColor: subject.color }}>
                      <BookOpen className="w-3.5 h-3.5 mr-1" /> Read Now
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
