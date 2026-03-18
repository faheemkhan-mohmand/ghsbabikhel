import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockAchievements, Achievement } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Trophy } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminAchievements() {
  const [items, setItems] = useState<Achievement[]>(mockAchievements);
  const [editing, setEditing] = useState<Achievement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: '' });

  const openAdd = () => { setEditing(null); setForm({ title: '', description: '', category: '' }); setIsOpen(true); };
  const openEdit = (a: Achievement) => { setEditing(a); setForm({ title: a.title, description: a.description, category: a.category }); setIsOpen(true); };

  const handleSave = () => {
    if (!form.title) return;
    if (editing) {
      setItems(prev => prev.map(a => a.id === editing.id ? { ...a, ...form } : a));
      toast.success('Updated');
    } else {
      setItems(prev => [{ id: Date.now().toString(), ...form, date: new Date().toISOString().split('T')[0] }, ...prev]);
      toast.success('Added');
    }
    setIsOpen(false);
  };

  return (
    <DashboardLayout isAdmin>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Manage Achievements</h1>
          <p className="text-sm text-muted-foreground">{items.length} achievements</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="btn-press gap-1" onClick={openAdd}><Plus className="w-4 h-4" /> Add</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? 'Edit Achievement' : 'Add Achievement'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="mt-1" /></div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="mt-1" /></div>
              <div><Label>Category</Label><Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Academic, Sports, Recognition" className="mt-1" /></div>
              <Button onClick={handleSave} className="w-full btn-press">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-3">
        {items.map(a => (
          <div key={a.id} className="card-matte p-5 flex items-start gap-3">
            <Trophy className="w-4 h-4 text-primary mt-1 shrink-0" />
            <div className="flex-1">
              <h3 className="font-display font-semibold text-sm">{a.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{a.category}</span>
                <span className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => openEdit(a)}><Pencil className="w-3.5 h-3.5" /></Button>
              <Button variant="ghost" size="sm" onClick={() => { setItems(p => p.filter(x => x.id !== a.id)); toast.success('Deleted'); }} className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
