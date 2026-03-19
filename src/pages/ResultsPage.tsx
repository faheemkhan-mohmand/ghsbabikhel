import { useState, useMemo } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import { useResults, initials } from '@/hooks/useSupabaseData';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Users, BarChart3 } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

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

export default function ResultsPage() {
  const [selectedClass, setSelectedClass] = useState('10th');
  const [selectedExam, setSelectedExam] = useState('Annual-I');
  const { data: results, isLoading } = useResults(selectedClass, selectedExam);

  const filtered = results || [];
  const totalStudents = filtered.length;
  const passed = filtered.filter(r => Number(r.percentage) >= 33).length;
  const passPercentage = totalStudents > 0 ? ((passed / totalStudents) * 100).toFixed(1) : '0';

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h1 className="text-4xl font-display font-extrabold mb-4">Examination Results</h1>
            <p className="text-muted-foreground text-lg">View class-wise examination results</p>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Select value={selectedClass} onValueChange={(v) => { setSelectedClass(v); setSelectedExam(examTypes[v][0]); }}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Select Class" /></SelectTrigger>
              <SelectContent>{classes.map(c => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Select Exam" /></SelectTrigger>
              <SelectContent>{examTypes[selectedClass].map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            {[
              { icon: Users, label: 'Total Students', value: totalStudents },
              { icon: Trophy, label: 'Passed', value: passed },
              { icon: BarChart3, label: 'Pass %', value: `${passPercentage}%` },
            ].map((s, i) => (
              <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.1 }} className="card-matte p-4 text-center">
                <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-xl font-display font-bold tabular-nums">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
          {filtered.length > 0 ? (
            <motion.div {...fadeUp} className="card-matte overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Position</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Roll #</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Obtained</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r) => (
                      <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4"><PositionBadge position={r.position} /></td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{initials(r.name)}</div>
                            <span className="font-medium text-sm">{r.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground tabular-nums">{r.roll_number}</td>
                        <td className="px-6 py-4 text-sm text-right font-medium tabular-nums">{r.obtained_marks}</td>
                        <td className="px-6 py-4 text-sm text-right text-muted-foreground tabular-nums">{r.total_marks}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`text-sm font-semibold tabular-nums ${Number(r.percentage) >= 80 ? 'text-primary' : Number(r.percentage) >= 60 ? 'text-gold' : 'text-muted-foreground'}`}>
                            {Number(r.percentage).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <div className="card-matte p-12 text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">{isLoading ? 'Loading results...' : 'No results available for this selection.'}</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
