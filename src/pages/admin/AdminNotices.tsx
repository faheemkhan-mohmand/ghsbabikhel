import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useNotices, useMutateNotice, Notice } from '@/hooks/useSupabaseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Bell } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminNotices() {
  const { data: notices } = useNotices();
  const { upsert, remove } = useMutateNotice();
  const [editing, setEditing] = useState<Notice | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', priority: 'medium' as Notice['priority'] });

  const openAdd = () => { setEditing(null); setForm({ title: '', content: '', priority: 'medium' }); setIsOpen(true); };
  const openEdit = (n: Notice) => { setEditing(n); setForm({ title: n.title, content: n.content, priority: n.priority }); setIsOpen(true); };

  const handleSave = async () => {
    if (!form.title) return;
    try {
      await upsert.mutateAsync({
        ...form,
        date: editing?.date || new Date().toISOString().split('T')[0],
        ...(editing ? { id: editing.id } : {}),
      });
      toast.success(editing ? 'Notice updated' : 'Notice added');
      setIsOpen(false);
    } catch (e: any) { toast.error(e.message); }
  };

  const handleDelete = async (id: string) => {
    try { await remove.mutateAsync(id); toast.success('Deleted'); } catch (e: any) { toast.error(e.message); }
  };

  return (
    <DashboardLayout isAdmin>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Manage Notices</h1>
          <p className="text-sm text-muted-foreground">{notices?.length || 0} notices</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="btn-press gap-1" onClick={openAdd}><Plus className="w-4 h-4" /> Add Notice</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? 'Edit Notice' : 'Add Notice'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="mt-1" /></div>
              <div><Label>Content</Label><Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="mt-1" /></div>
              <div>
                <Label>Priority</Label>
                <Select value={form.priority} onValueChange={v => setForm(f => ({ ...f, priority: v as Notice['priority'] }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} className="w-full btn-press" disabled={upsert.isPending}>{upsert.isPending ? 'Saving...' : 'Save'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-3">
        {(notices || []).map(n => (
          <div key={n.id} className="card-matte p-5 flex items-start gap-3">
            <Bell className="w-4 h-4 text-primary mt-1 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-sm">{n.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${n.priority === 'high' ? 'bg-destructive/10 text-destructive' : n.priority === 'medium' ? 'bg-gold/10 text-gold' : 'bg-muted text-muted-foreground'}`}>{n.priority}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{n.content}</p>
              <p className="text-xs text-muted-foreground mt-1">{new Date(n.date).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => openEdit(n)}><Pencil className="w-3.5 h-3.5" /></Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(n.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
