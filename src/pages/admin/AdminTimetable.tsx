import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTimetable, useMutateTimetable } from '@/hooks/useSupabaseData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const classes = ['6th', '7th', '8th', '9th', '10th'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const defaultPeriods = [
  { period: 1, time: '8:00 - 8:40' }, { period: 2, time: '8:40 - 9:20' }, { period: 3, time: '9:20 - 10:00' },
  { period: 4, time: '10:00 - 10:40' }, { period: 5, time: '10:40 - 11:00' }, { period: 6, time: '11:00 - 11:40' },
  { period: 7, time: '11:40 - 12:20' }, { period: 8, time: '12:20 - 1:00' },
];

export default function AdminTimetable() {
  const [selectedClass, setSelectedClass] = useState('6th');
  const { data: entries, isLoading } = useTimetable(selectedClass);
  const { bulkUpsert } = useMutateTimetable();
  const [editData, setEditData] = useState<Record<string, { subject: string; teacher: string }>>({});

  const periods = useMemo(() => {
    if (!entries || entries.length === 0) return defaultPeriods;
    const unique = [...new Set(entries.map(e => e.period))].sort((a, b) => a - b);
    return unique.map(p => {
      const entry = entries.find(e => e.period === p);
      return { period: p, time: entry?.time || '' };
    });
  }, [entries]);

  const getEntry = (day: string, period: number) => {
    const key = `${day}-${period}`;
    if (editData[key]) return editData[key];
    const entry = entries?.find(e => e.day === day && e.period === period);
    return { subject: entry?.subject || '', teacher: entry?.teacher || '' };
  };

  const setEntry = (day: string, period: number, field: 'subject' | 'teacher', value: string) => {
    const key = `${day}-${period}`;
    const current = getEntry(day, period);
    setEditData(prev => ({ ...prev, [key]: { ...current, [field]: value } }));
  };

  const handleSave = async () => {
    try {
      const allEntries = days.flatMap(day =>
        (periods.length > 0 ? periods : defaultPeriods).map(p => {
          const data = getEntry(day, p.period);
          const existing = entries?.find(e => e.day === day && e.period === p.period);
          return {
            ...(existing?.id ? { id: existing.id } : {}),
            class_name: selectedClass,
            day,
            period: p.period,
            time: p.time,
            subject: data.subject || '-',
            teacher: data.teacher || '-',
          };
        })
      );
      await bulkUpsert.mutateAsync(allEntries);
      setEditData({});
      toast.success('Timetable saved!');
    } catch (e: any) { toast.error(e.message); }
  };

  const usedPeriods = periods.length > 0 ? periods : defaultPeriods;

  return (
    <DashboardLayout isAdmin>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Manage Timetable</h1>
          <p className="text-sm text-muted-foreground">Edit class-wise timetables</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedClass} onValueChange={v => { setSelectedClass(v); setEditData({}); }}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>{classes.map(c => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}</SelectContent>
          </Select>
          <Button className="btn-press" onClick={handleSave} disabled={bulkUpsert.isPending}>
            {bulkUpsert.isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
      <div className="card-matte overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Day</th>
                {usedPeriods.map(p => (
                  <th key={p.period} className="px-2 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">
                    <div>P{p.period}</div>
                    <div className="font-normal text-[10px] mt-0.5">{p.time}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-medium whitespace-nowrap">{day}</td>
                  {usedPeriods.map(p => {
                    const data = getEntry(day, p.period);
                    return (
                      <td key={p.period} className="px-1 py-1">
                        <Input
                          value={data.subject}
                          onChange={e => setEntry(day, p.period, 'subject', e.target.value)}
                          placeholder="Subject"
                          className="text-xs h-7 mb-0.5"
                        />
                        <Input
                          value={data.teacher}
                          onChange={e => setEntry(day, p.period, 'teacher', e.target.value)}
                          placeholder="Teacher"
                          className="text-xs h-7 text-muted-foreground"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
