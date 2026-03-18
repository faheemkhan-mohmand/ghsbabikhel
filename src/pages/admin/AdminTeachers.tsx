import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockTeachers, Teacher } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', subject: '', qualification: '', experience: '' });

  const openAdd = () => {
    setEditingTeacher(null);
    setForm({ name: '', subject: '', qualification: '', experience: '' });
    setIsOpen(true);
  };

  const openEdit = (t: Teacher) => {
    setEditingTeacher(t);
    setForm({ name: t.name, subject: t.subject, qualification: t.qualification, experience: t.experience });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.subject) return;
    if (editingTeacher) {
      setTeachers(prev => prev.map(t => t.id === editingTeacher.id ? { ...t, ...form, initials: form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() } : t));
      toast.success('Teacher updated');
    } else {
      const newTeacher: Teacher = { id: Date.now().toString(), ...form, initials: form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() };
      setTeachers(prev => [...prev, newTeacher]);
      toast.success('Teacher added');
    }
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
    toast.success('Teacher removed');
  };

  return (
    <DashboardLayout isAdmin>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Manage Teachers</h1>
          <p className="text-sm text-muted-foreground">{teachers.length} educators</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="btn-press gap-1" onClick={openAdd}><Plus className="w-4 h-4" /> Add Teacher</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingTeacher ? 'Edit Teacher' : 'Add Teacher'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1" /></div>
              <div><Label>Subject</Label><Input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="mt-1" /></div>
              <div><Label>Qualification</Label><Input value={form.qualification} onChange={e => setForm(f => ({ ...f, qualification: e.target.value }))} className="mt-1" /></div>
              <div><Label>Experience</Label><Input value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} className="mt-1" /></div>
              <Button onClick={handleSave} className="w-full btn-press">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="card-matte overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Subject</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Qualification</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Experience</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(t => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{t.initials}</div>
                    <span className="font-medium">{t.name}</span>
                  </td>
                  <td className="px-4 py-3 text-primary font-medium">{t.subject}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{t.qualification}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{t.experience}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(t)}><Pencil className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
