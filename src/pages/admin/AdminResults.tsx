import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useResults, useMutateResult, initials, uploadFile, StudentResult } from '@/hooks/useSupabaseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Trophy, Users, BarChart3, TrendingUp, TrendingDown, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const classes = ['6th', '7th', '8th', '9th', '10th'];
const examTypes: Record<string, string[]> = {
  '6th': ['1st Semester', '2nd Semester'], '7th': ['1st Semester', '2nd Semester'], '8th': ['1st Semester', '2nd Semester'],
  '9th': ['Annual-I', 'Annual-II'], '10th': ['Annual-I', 'Annual-II'],
};

function PositionBadge({ position }: { position: number }) {
  if (position === 1) return <span className="badge-gold">🥇 1st</span>;
  if (position === 2) return <span className="badge-silver">🥈 2nd</span>;
  if (position === 3) return <span className="badge-bronze">🥉 3rd</span>;
  return <span className="text-sm text-muted-foreground tabular-nums">#{position}</span>;
}

export default function AdminResults() {
  const [selectedClass, setSelectedClass] = useState('10th');
  const [selectedExam, setSelectedExam] = useState('Annual-I');
  const { data: results } = useResults(selectedClass, selectedExam);
  const { upsert, remove } = useMutateResult();
  const [editing, setEditing] = useState<StudentResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', roll_number: '', obtained_marks: '', total_marks: '' });
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const filtered = results || [];
  const totalStudents = filtered.length;
  const passed = filtered.filter(r => Number(r.percentage) >= 33).length;
  const failed = totalStudents - passed;
  const highest = filtered.length > 0 ? Math.max(...filtered.map(r => Number(r.percentage))) : 0;
  const lowest = filtered.length > 0 ? Math.min(...filtered.map(r => Number(r.percentage))) : 0;

  const openAdd = () => { setEditing(null); setForm({ name: '', roll_number: '', obtained_marks: '', total_marks: '' }); setPhotoFile(null); setIsOpen(true); };
  const openEdit = (r: StudentResult) => { setEditing(r); setForm({ name: r.name, roll_number: r.roll_number, obtained_marks: r.obtained_marks.toString(), total_marks: r.total_marks.toString() }); setPhotoFile(null); setIsOpen(true); };

  const handleSave = async () => {
    if (!form.name || !form.roll_number) return;
    try {
      let photo_url = editing?.photo_url;
      if (photoFile) {
        photo_url = await uploadFile('photos', `students/${Date.now()}_${photoFile.name}`, photoFile);
      }
      await upsert.mutateAsync({
        name: form.name,
        roll_number: form.roll_number,
        obtained_marks: parseInt(form.obtained_marks) || 0,
        total_marks: parseInt(form.total_marks) || 0,
        class_name: selectedClass,
        exam_type: selectedExam,
        photo_url,
        ...(editing ? { id: editing.id } : {}),
      });
      toast.success(editing ? 'Result updated' : 'Student added');
      setIsOpen(false);
    } catch (e: any) { toast.error(e.message); }
  };

  const handleDelete = async (id: string) => {
    try { await remove.mutateAsync(id); toast.success('Deleted'); } catch (e: any) { toast.error(e.message); }
  };

  const summaryCards = [
    { icon: Users, label: 'Total', value: totalStudents, color: 'bg-primary/10 text-primary' },
    { icon: Trophy, label: 'Passed', value: passed, color: 'bg-green-50 text-green-600' },
    { icon: XCircle, label: 'Failed', value: failed, color: 'bg-destructive/10 text-destructive' },
    { icon: BarChart3, label: 'Pass %', value: totalStudents ? `${((passed / totalStudents) * 100).toFixed(0)}%` : '0%', color: 'bg-accent text-accent-foreground' },
    { icon: TrendingUp, label: 'Highest', value: `${highest.toFixed(1)}%`, color: 'bg-primary/10 text-primary' },
    { icon: TrendingDown, label: 'Lowest', value: `${lowest.toFixed(1)}%`, color: 'bg-muted text-muted-foreground' },
  ];

  return (
    <DashboardLayout isAdmin>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Manage Results</h1>
          <p className="text-sm text-muted-foreground">Add, edit, and manage student results</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="btn-press gap-1" onClick={openAdd}><Plus className="w-4 h-4" /> Add Student</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? 'Edit Result' : 'Add Student Result'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Student Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1" /></div>
              <div><Label>Roll Number</Label><Input value={form.roll_number} onChange={e => setForm(f => ({ ...f, roll_number: e.target.value }))} className="mt-1" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Obtained Marks</Label><Input type="number" value={form.obtained_marks} onChange={e => setForm(f => ({ ...f, obtained_marks: e.target.value }))} className="mt-1" /></div>
                <div><Label>Total Marks</Label><Input type="number" value={form.total_marks} onChange={e => setForm(f => ({ ...f, total_marks: e.target.value }))} className="mt-1" /></div>
              </div>
              <div><Label>Student Photo (optional)</Label><Input type="file" accept="image/*" onChange={e => setPhotoFile(e.target.files?.[0] || null)} className="mt-1" /></div>
              <p className="text-xs text-muted-foreground">Class: {selectedClass} | Exam: {selectedExam} — Percentage calculated automatically.</p>
              <Button onClick={handleSave} className="w-full btn-press" disabled={upsert.isPending}>{upsert.isPending ? 'Saving...' : 'Save'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <Select value={selectedClass} onValueChange={v => { setSelectedClass(v); setSelectedExam(examTypes[v][0]); }}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>{classes.map(c => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={selectedExam} onValueChange={setSelectedExam}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>{examTypes[selectedClass].map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {summaryCards.map(s => (
          <div key={s.label} className="card-matte p-4 text-center">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${s.color}`}>
              <s.icon className="w-4 h-4" />
            </div>
            <p className="text-xl font-display font-bold tabular-nums">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card-matte overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Rank</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Roll #</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Marks</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">%</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${r.position <= 3 ? 'bg-accent/20' : ''}`}>
                  <td className="px-4 py-3"><PositionBadge position={r.position} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {r.photo_url ? (
                        <img src={r.photo_url} alt={r.name} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{initials(r.name)}</div>
                      )}
                      <span className="font-medium">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{r.roll_number}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{r.obtained_marks}/{r.total_marks}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">{Number(r.percentage).toFixed(1)}%</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(r)}><Pencil className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(r.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
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
