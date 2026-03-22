import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useResults, initials } from '@/hooks/useSupabaseData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Trophy, Users, BarChart3, TrendingUp, TrendingDown, XCircle, Calculator } from 'lucide-react';

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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const { data: allResults, isLoading } = useResults(selectedClass, selectedExam);

  const yearOptions = Array.from(new Set((allResults || []).map(r => r.year).filter(Boolean))).sort().reverse();
  const filtered = (allResults || []).filter(r => !selectedYear || r.year === selectedYear);
  const totalStudents = filtered.length;
  const passed = filtered.filter(r => Number(r.percentage) >= 33).length;
  const failed = totalStudents - passed;
  const highest = filtered.length > 0 ? Math.max(...filtered.map(r => Number(r.percentage))) : 0;
  const lowest = filtered.length > 0 ? Math.min(...filtered.map(r => Number(r.percentage))) : 0;
  const average = filtered.length > 0 ? filtered.reduce((s, r) => s + Number(r.percentage), 0) / filtered.length : 0;

  const summaryCards = [
    { icon: Users, label: 'Total Students', value: totalStudents, color: 'bg-primary/10 text-primary' },
    { icon: Trophy, label: 'Passed', value: passed, color: 'bg-green-50 text-green-600' },
    { icon: XCircle, label: 'Failed', value: failed, color: 'bg-destructive/10 text-destructive' },
    { icon: BarChart3, label: 'Pass %', value: totalStudents ? `${((passed / totalStudents) * 100).toFixed(0)}%` : '0%', color: 'bg-accent text-accent-foreground' },
    { icon: TrendingUp, label: 'Highest', value: `${highest.toFixed(1)}%`, color: 'bg-primary/10 text-primary' },
    { icon: TrendingDown, label: 'Lowest', value: `${lowest.toFixed(1)}%`, color: 'bg-muted text-muted-foreground' },
    { icon: Calculator, label: 'Average', value: `${average.toFixed(1)}%`, color: 'bg-accent text-accent-foreground' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Results</h1>
        <p className="text-sm text-muted-foreground">View examination results and rankings</p>
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
        <div>
          <Input
            type="number"
            list="result-year-options-dashboard"
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            className="w-32"
            placeholder="Year"
          />
          <datalist id="result-year-options-dashboard">
            {yearOptions.map(y => <option key={y} value={y} />)}
          </datalist>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Year</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Marks</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">%</th>
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
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{r.year || '-'}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{r.obtained_marks}/{r.total_marks}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">{Number(r.percentage).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
