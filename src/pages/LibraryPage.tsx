import PublicLayout from '@/components/layout/PublicLayout';
import { useLibrary } from '@/hooks/useSupabaseData';
import { motion } from 'framer-motion';
import { FileText, FileIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function LibraryPage() {
  const [filter, setFilter] = useState('all');
  const { data: library } = useLibrary();
  const items = library || [];
  const filtered = filter === 'all' ? items : items.filter(item => item.category === filter);

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h1 className="text-4xl font-display font-extrabold mb-4">Digital Library</h1>
            <p className="text-muted-foreground text-lg">Access past papers, books, and notes</p>
          </motion.div>
          <div className="flex justify-center mb-8">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Filter by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="past-paper">Past Papers</SelectItem>
                <SelectItem value="book">Books</SelectItem>
                <SelectItem value="notes">Notes</SelectItem>
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
                        <a href={item.file_url} target="_blank" rel="noopener noreferrer">
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
