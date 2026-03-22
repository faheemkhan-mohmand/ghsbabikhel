import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTimetable } from '@/hooks/useSupabaseData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const classes = ['6th', '7th', '8th', '9th', '10th'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function DashboardTimetable() {
  const [selectedClass, setSelectedClass] = useState('6th');
  const { data: entries, isLoading } = useTimetable(selectedClass);

  const parseLegacyTime = (time?: string) => {
    if (!time) return { start: '', end: '' };
    const [start, end] = time.split('-').map((v) => v?.trim() || '');
    return { start, end };
  };

  const periods = useMemo(() => {
    if (!entries || entries.length === 0) return [];
    const uniquePeriods = [...new Set(entries.map(e => e.period))].sort((a, b) => a - b);
    return uniquePeriods.map(p => {
      const entry = entries.find(e => e.period === p);
      const legacy = parseLegacyTime(entry?.time);
      const start = entry?.start_time || legacy.start;
      const end = entry?.end_time || legacy.end;
      return {
        period: p,
        period_name: entry?.period_name || `P${p}`,
        start_time: start,
        end_time: end,
        time: start && end ? `${start} - ${end}` : (entry?.time || ''),
      };
    });
  }, [entries]);

  const getEntry = (day: string, period: number) => {
    return entries?.find(e => e.day === day && e.period === period);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Timetable</h1>
          <p className="text-sm text-muted-foreground">View class-wise timetable</p>
        </div>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>{classes.map(c => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <div className="card-matte p-12 text-center text-muted-foreground">Loading timetable...</div>
      ) : periods.length === 0 ? (
        <div className="card-matte p-12 text-center text-muted-foreground">No timetable available for this class.</div>
      ) : (
        <div className="card-matte overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Day</th>
                  {periods.map(p => (
                    <th key={p.period} className={`px-3 py-3 text-center text-xs font-semibold text-muted-foreground uppercase ${p.period === 7 ? 'border-l border-border/70' : ''}`}>
                      <div>{p.period_name}</div>
                      <div className="font-normal text-[10px] mt-0.5">{p.time}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map(day => (
                  <tr key={day} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{day}</td>
                    {periods.map(p => {
                      const entry = getEntry(day, p.period);
                      const isBreak = p.period === 7 || /break/i.test(p.period_name || '') || /break/i.test(entry?.subject || '');
                      return (
                        <td key={p.period} className={`px-3 py-3 text-center ${isBreak ? 'bg-muted/50 text-muted-foreground italic' : ''}`}>
                          <div className="font-medium text-xs">{entry?.subject || '-'}</div>
                          {entry?.teacher && entry.teacher !== '-' && <div className="text-[10px] text-muted-foreground mt-0.5">{entry.teacher}</div>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
