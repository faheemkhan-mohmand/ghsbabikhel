import { Link } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import { classesData } from '@/data/notesData';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function NotesPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        <div className="container-main relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">GHS Babi Khel</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              Study Notes
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Select your class and subject to start learning
            </p>
          </motion.div>
        </div>
      </section>

      {/* Class Cards */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container-main">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Choose Your Class</h2>
            <p className="text-muted-foreground mt-2">Pick your class to browse subjects and chapters</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {classesData.map((cls, i) => {
              const totalChapters = cls.subjects.reduce((sum, s) => sum + s.chapters.length, 0);
              return (
                <motion.div
                  key={cls.classNumber}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    to={`/notes/class-${cls.classNumber}`}
                    className="group block rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-border/50"
                    style={{ backgroundColor: `${cls.color}10` }}
                  >
                    <div
                      className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${cls.color}20` }}
                    >
                      {cls.emoji}
                    </div>
                    <h3 className="text-lg font-display font-bold" style={{ color: cls.color }}>
                      Class {cls.classNumber}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cls.subjects.length} Subjects
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {totalChapters} Chapters
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
