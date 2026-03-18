import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockNews, NewsItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Newspaper } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '' });

  const openAdd = () => { setEditing(null); setForm({ title: '', excerpt: '', content: '' }); setIsOpen(true); };
  const openEdit = (n: NewsItem) => { setEditing(n); setForm({ title: n.title, excerpt: n.excerpt, content: n.content }); setIsOpen(true); };

  const handleSave = () => {
    if (!form.title) return;
    if (editing) {
      setNews(prev => prev.map(n => n.id === editing.id ? { ...n, ...form } : n));
      toast.success('News updated');
    } else {
      setNews(prev => [{ id: Date.now().toString(), ...form, date: new Date().toISOString().split('T')[0] }, ...prev]);
      toast.success('News added');
    }
    setIsOpen(false);
  };

  return (
    <DashboardLayout isAdmin>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Manage News</h1>
          <p className="text-sm text-muted-foreground">{news.length} articles</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="btn-press gap-1" onClick={openAdd}><Plus className="w-4 h-4" /> Add News</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? 'Edit News' : 'Add News'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="mt-1" /></div>
              <div><Label>Excerpt</Label><Input value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} className="mt-1" /></div>
              <div><Label>Content</Label><Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="mt-1" rows={4} /></div>
              <Button onClick={handleSave} className="w-full btn-press">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {news.map(n => (
          <div key={n.id} className="card-matte p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">{new Date(n.date).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => openEdit(n)}><Pencil className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => { setNews(p => p.filter(x => x.id !== n.id)); toast.success('Deleted'); }} className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
            <h3 className="font-display font-semibold text-sm">{n.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{n.excerpt}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
