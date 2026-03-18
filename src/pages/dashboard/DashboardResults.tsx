import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockResults } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Users, BarChart3 } from 'lucide-react';

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

export default function DashboardResults() {
  const [selectedClass, setSelectedClass] = useState('10th');
  const [selectedExam, setSelectedExam] = useState('Annual-I');

  const filtered = useMemo(() =>
    mockResults.filter(r => r.className === selectedClass && r.examType === selectedExam).sort((a, b) => a.position - b.position),
    [selectedClass, selectedExam]
  );

  const totalStudents = filtered.length;
  const passed = filtered.filter(r => r.percentage >= 33).length;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Results</h1>
        <p className="text-sm text-muted-foreground">View examination results</p>
      </div>
      <div className="flex flex-wrap gap-3 mb-6">
        <Select value={selectedClass} onValueChange={(v) => { setSelectedClass(v); setSelectedExam(examTypes[v][0]); }}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
