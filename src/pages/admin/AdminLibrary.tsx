import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockLibrary, LibraryItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, FileText, FileIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLibrary() {
  const [items, setItems] = useState<LibraryItem[]>(mockLibrary);
  const [editing, setEditing] = useState<LibraryItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'past-paper' as LibraryItem['category'], fileType: 'pdf' as LibraryItem['fileType'], subject: '', classLevel: '' });

  const openAdd = () => { setEditing(null); setForm({ title: '', category: 'past-paper', fileType: 'pdf', subject: '', classLevel: '' }); setIsOpen(true); };
  const openEdit = (item: LibraryItem) => { setEditing(item); setForm({ title: item.title, category: item.category, fileType: item.fileType, subject: item.subject, classLevel: item.classLevel }); setIsOpen(true); };

  const handleSave = () => {
    if (!form.title) return;
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form } : i));
      toast.success('Item updated');
    } else {
      setItems(prev => [...prev, { id: Date.now().toString(), ...form, fileUrl: '#', uploadDate: new Date().toISOString().split('T')[0] }]);
      toast.success('Item added');
    }
    setIsOpen(false);
  };

  return (
    <DashboardLayout isAdmin>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Manage Library</h1>
          <p className="text-sm text-muted-foreground">{items.length} resources</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="btn-press gap-1" onClick={openAdd}><Plus className="w-4 h-4" /> Add Resource</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? 'Edit Resource' : 'Add Resource'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="mt-1" /></div>
              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v as LibraryItem['category'] }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="past-paper">Past Paper</SelectItem>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="notes">Notes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Subject</Label><Input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="mt-1" /></div>
                <div><Label>Class</Label><Input value={form.classLevel} onChange={e => setForm(f => ({ ...f, classLevel: e.target.value }))} className="mt-1" /></div>
              </div>
              <div>
                <Label>File Type</Label>
                <Select value={form.fileType} onValueChange={v => setForm(f => ({ ...f, fileType: v as LibraryItem['fileType'] }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">DOCX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground">File upload will be available with Supabase Storage integration.</p>
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Subject</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Type</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 flex items-center gap-2">
                    {item.fileType === 'pdf' ? <FileText className="w-4 h-4 text-destructive shrink-0" /> : <FileIcon className="w-4 h-4 text-primary shrink-0" />}
                    <span className="font-medium">{item.title}</span>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-muted">{item.category}</span></td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{item.subject}</td>
                  <td className="px-4 py-3 hidden md:table-cell"><span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground uppercase">{item.fileType}</span></td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(item)}><Pencil className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => { setItems(p => p.filter(x => x.id !== item.id)); toast.success('Deleted'); }} className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
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
