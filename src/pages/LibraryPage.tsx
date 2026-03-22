import PublicLayout from '@/components/layout/PublicLayout';
import { useLibrary } from '@/hooks/useSupabaseData';
import { motion } from 'framer-motion';
import { FileText, FileIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function LibraryPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const { data: library } = useLibrary();
  const items = library || [];
  const classOptions = Array.from(new Set(items.map(i => i.class_level).filter(Boolean))).sort();
  const subjectOptions = Array.from(new Set(items.map(i => i.subject).filter(Boolean))).sort();

  const filtered = items.filter((item) => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const matchesClass = classFilter === 'all' || item.class_level === classFilter;
    const matchesSubject = subjectFilter === 'all' || item.subject === subjectFilter;
    const term = search.toLowerCase().trim();
    const matchesSearch = !term || [item.title, item.subject, item.class_level, item.category].some(v => (v || '').toLowerCase().includes(term));
    return matchesCategory && matchesClass && matchesSubject && matchesSearch;
  });

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h1 className="text-4xl font-display font-extrabold mb-4">Digital Library</h1>
            <p className="text-muted-foreground text-lg">Access past papers, books, and notes</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search title, class, subject..." />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="past-paper">Past Papers</SelectItem>
                <SelectItem value="book">Books</SelectItem>
                <SelectItem value="notes">Notes</SelectItem>
              </SelectContent>
            </Select>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger><SelectValue placeholder="Class" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classOptions.map(c => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger><SelectValue placeholder="Subject" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjectOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filtered.map((item, i) => (
              <motion.div key={item.id} {...fadeUp} transition={{ delay: i * 0.05 }} className="card-matte p-6 hover:shadow-lift transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.file_type === 'pdf' ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                    {item.file_type === 'pdf' ? <FileText className="w-5 h-5 text-destructive" /> : <FileIcon className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-sm">{item.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{item.subject}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Class {item.class_level}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground uppercase">{item.file_type}</span>
                    </div>
                    <div className="mt-4">
                      {item.file_url ? (
                        <a href={item.file_url} target="_blank" rel="noopener noreferrer" download>
                          <Button size="sm" variant="outline" className="btn-press gap-1 text-xs"><Download className="w-3 h-3" /> Download</Button>
                        </a>
                      ) : (
                        <Button size="sm" variant="outline" className="btn-press gap-1 text-xs" disabled><Download className="w-3 h-3" /> No file</Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
