import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockResults, StudentResult } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Trophy, Users, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

const classes = ['6th', '7th', '8th', '9th', '10th'];
const examTypes: Record<string, string[]> = {
  '6th': ['1st Semester', '2nd Semester'], '7th': ['1st Semester', '2nd Semester'], '8th': ['1st Semester', '2nd Semester'],
  '9th': ['Annual-I', 'Annual-II'], '10th': ['Annual-I', 'Annual-II'],
};

function recalcPositions(results: StudentResult[], cls: string, exam: string): StudentResult[] {
  const classResults = results.filter(r => r.className === cls && r.examType === exam).sort((a, b) => b.percentage - a.percentage);
  const otherResults = results.filter(r => !(r.className === cls && r.examType === exam));
  return [...otherResults, ...classResults.map((r, i) => ({ ...r, position: i + 1 }))];
}

function PositionBadge({ position }: { position: number }) {
  if (position === 1) return <span className="badge-gold">🥇 1st</span>;
  if (position === 2) return <span className="badge-silver">🥈 2nd</span>;
  if (position === 3) return <span className="badge-bronze">🥉 3rd</span>;
  return <span className="text-sm text-muted-foreground tabular-nums">#{position}</span>;
}

export default function AdminResults() {
  const [results, setResults] = useState<StudentResult[]>(mockResults);
  const [selectedClass, setSelectedClass] = useState('10th');
  const [selectedExam, setSelectedExam] = useState('Annual-I');
  const [editing, setEditing] = useState<StudentResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', rollNumber: '', obtainedMarks: '', totalMarks: '' });

  const filtered = useMemo(() =>
    results.filter(r => r.className === selectedClass && r.examType === selectedExam).sort((a, b) => a.position - b.position),
    [results, selectedClass, selectedExam]
  );

  const totalStudents = filtered.length;
  const passed = filtered.filter(r => r.percentage >= 33).length;

  const openAdd = () => { setEditing(null); setForm({ name: '', rollNumber: '', obtainedMarks: '', totalMarks: '' }); setIsOpen(true); };
  const openEdit = (r: StudentResult) => { setEditing(r); setForm({ name: r.name, rollNumber: r.rollNumber, obtainedMarks: r.obtainedMarks.toString(), totalMarks: r.totalMarks.toString() }); setIsOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.rollNumber) return;
    const obtained = parseInt(form.obtainedMarks) || 0;
    const total = parseInt(form.totalMarks) || 0;
    const percentage = total > 0 ? (obtained / total) * 100 : 0;

    let updated: StudentResult[];
    if (editing) {
      updated = results.map(r => r.id === editing.id ? { ...r, name: form.name, rollNumber: form.rollNumber, obtainedMarks: obtained, totalMarks: total, percentage, initials: form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() } : r);
    } else {
      const newResult: StudentResult = { id: Date.now().toString(), name: form.name, rollNumber: form.rollNumber, initials: form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(), className: selectedClass, examType: selectedExam, obtainedMarks: obtained, totalMarks: total, percentage, position: 0 };
      updated = [...results, newResult];
    }
    setResults(recalcPositions(updated, selectedClass, selectedExam));
    toast.success(editing ? 'Result updated' : 'Student added');
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    const r = results.find(x => x.id === id);
    const updated = results.filter(x => x.id !== id);
    if (r) setResults(recalcPositions(updated, r.className, r.examType));
    toast.success('Deleted');
  };

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
              <div><Label>Roll Number</Label><Input value={form.rollNumber} onChange={e => setForm(f => ({ ...f, rollNumber: e.target.value }))} className="mt-1" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Obtained Marks</Label><Input type="number" value={form.obtainedMarks} onChange={e => setForm(f => ({ ...f, obtainedMarks: e.target.value }))} className="mt-1" /></div>
                <div><Label>Total Marks</Label><Input type="number" value={form.totalMarks} onChange={e => setForm(f => ({ ...f, totalMarks: e.target.value }))} className="mt-1" /></div>
              </div>
              <p className="text-xs text-muted-foreground">Class: {selectedClass} | Exam: {selectedExam}</p>
              <p className="text-xs text-muted-foreground">Percentage and position will be calculated automatically.</p>
              <Button onClick={handleSave} className="w-full btn-press">Save</Button>
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

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{ icon: Users, label: 'Total', value: totalStudents }, { icon: Trophy, label: 'Passed', value: passed }, { icon: BarChart3, label: 'Pass %', value: totalStudents ? `${((passed / totalStudents) * 100).toFixed(0)}%` : '0%' }].map(s => (
          <div key={s.label} className="card-matte p-4 text-center">
            <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Pos</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Roll #</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Marks</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">%</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3"><PositionBadge position={r.position} /></td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{r.initials}</div>
                    <span className="font-medium">{r.name}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{r.rollNumber}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{r.obtainedMarks}/{r.totalMarks}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">{r.percentage.toFixed(1)}%</td>
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
