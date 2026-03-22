import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTimetable, useMutateTimetable } from '@/hooks/useSupabaseData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const classes = ['6th', '7th', '8th', '9th', '10th'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

type PeriodMeta = {
  period: number;
  period_name: string;
  start_time: string;
  end_time: string;
};

const defaultPeriods: PeriodMeta[] = [
  { period: 1, period_name: 'P1', start_time: '08:00', end_time: '08:40' },
  { period: 2, period_name: 'P2', start_time: '08:40', end_time: '09:20' },
  { period: 3, period_name: 'P3', start_time: '09:20', end_time: '10:00' },
  { period: 4, period_name: 'P4', start_time: '10:00', end_time: '10:40' },
  { period: 5, period_name: 'P5', start_time: '10:40', end_time: '11:20' },
  { period: 6, period_name: 'P6', start_time: '11:20', end_time: '12:00' },
  { period: 7, period_name: 'Break', start_time: '12:00', end_time: '12:20' },
  { period: 8, period_name: 'P8', start_time: '12:20', end_time: '13:00' },
  { period: 9, period_name: 'P9', start_time: '13:00', end_time: '13:40' },
];

function parseLegacyTime(time?: string) {
  if (!time) return { start_time: '', end_time: '' };
  const [start, end] = time.split('-').map((v) => v?.trim() || '');
  return { start_time: start, end_time: end };
}

export default function AdminTimetable() {
  const [selectedClass, setSelectedClass] = useState('6th');
  const { data: entries } = useTimetable(selectedClass);
  const { bulkUpsert } = useMutateTimetable();

  const [editData, setEditData] = useState<Record<string, { subject: string; teacher: string }>>({});
  const [editPeriods, setEditPeriods] = useState<Record<number, { period_name: string; start_time: string; end_time: string }>>({});

  const periods = useMemo(() => {
    const fromEntries: PeriodMeta[] = (entries || []).length > 0
      ? [...new Set((entries || []).map((e) => e.period))]
          .sort((a, b) => a - b)
          .map((period) => {
            const entry = entries?.find((e) => e.period === period);
            const fallback = defaultPeriods.find((dp) => dp.period === period);
            const legacy = parseLegacyTime(entry?.time);
            return {
              period,
              period_name: entry?.period_name || fallback?.period_name || `P${period}`,
              start_time: entry?.start_time || legacy.start_time || fallback?.start_time || '',
              end_time: entry?.end_time || legacy.end_time || fallback?.end_time || '',
            };
          })
      : defaultPeriods;

    const merged = [...fromEntries];
    for (let period = 1; period <= 9; period += 1) {
      if (!merged.some((p) => p.period === period)) {
        merged.push(defaultPeriods.find((p) => p.period === period)!);
      }
    }
    return merged.sort((a, b) => a.period - b.period);
  }, [entries]);

  const getPeriodMeta = (period: number) => {
    if (editPeriods[period]) return editPeriods[period];
    const item = periods.find((p) => p.period === period);
    return {
      period_name: item?.period_name || `P${period}`,
      start_time: item?.start_time || '',
      end_time: item?.end_time || '',
    };
  };

  const getEntry = (day: string, period: number) => {
    const key = `${day}-${period}`;
    if (editData[key]) return editData[key];
    const entry = entries?.find((e) => e.day === day && e.period === period);
    return { subject: entry?.subject || '', teacher: entry?.teacher || '' };
  };

  const setEntry = (day: string, period: number, field: 'subject' | 'teacher', value: string) => {
    const key = `${day}-${period}`;
    const current = getEntry(day, period);
    setEditData((prev) => ({ ...prev, [key]: { ...current, [field]: value } }));
  };

  const setPeriodMeta = (period: number, field: 'period_name' | 'start_time' | 'end_time', value: string) => {
    const current = getPeriodMeta(period);
    setEditPeriods((prev) => ({ ...prev, [period]: { ...current, [field]: value } }));
  };

  const handleSave = async () => {
    try {
      const allEntries = days.flatMap((day) =>
        periods.map((p) => {
          const data = getEntry(day, p.period);
          const meta = getPeriodMeta(p.period);
          const existing = entries?.find((e) => e.day === day && e.period === p.period);
          const isBreak = p.period === 7 || /break/i.test(meta.period_name || '');

          return {
            ...(existing?.id ? { id: existing.id } : {}),
            class_name: selectedClass,
            day,
            period: p.period,
            period_name: meta.period_name || `P${p.period}`,
            start_time: meta.start_time,
            end_time: meta.end_time,
            time: `${meta.start_time || ''} - ${meta.end_time || ''}`.replace(/^\s*-\s*|\s*-\s*$/g, ''),
            subject: isBreak ? 'Break' : (data.subject || '-'),
            teacher: isBreak ? '-' : (data.teacher || '-'),
          };
        }),
      );

      await bulkUpsert.mutateAsync(allEntries);
      setEditData({});
      setEditPeriods({});
      toast.success('Timetable saved!');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <DashboardLayout isAdmin>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Manage Timetable</h1>
          <p className="text-sm text-muted-foreground">9 periods with editable names and times (break after period 6)</p>
        </div>
        <div className="flex gap-2">
          <Select
            value={selectedClass}
            onValueChange={(v) => {
              setSelectedClass(v);
              setEditData({});
              setEditPeriods({});
            }}
          >
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>{classes.map((c) => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}</SelectContent>
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
                {periods.map((p) => {
                  const meta = getPeriodMeta(p.period);
                  const isBreak = p.period === 7;
                  return (
                    <th key={p.period} className={`px-2 py-3 text-center align-top ${isBreak ? 'border-l border-border/70' : ''}`}>
                      <Input
                        value={meta.period_name}
                        onChange={(e) => setPeriodMeta(p.period, 'period_name', e.target.value)}
                        className="text-[10px] h-6 text-center w-20 mx-auto font-semibold"
                        placeholder={`P${p.period}`}
                      />
                      <div className="flex gap-1 mt-1 justify-center">
                        <Input
                          type="time"
                          value={meta.start_time}
                          onChange={(e) => setPeriodMeta(p.period, 'start_time', e.target.value)}
                          className="text-[10px] h-6 w-[86px]"
                        />
                        <Input
                          type="time"
                          value={meta.end_time}
                          onChange={(e) => setPeriodMeta(p.period, 'end_time', e.target.value)}
                          className="text-[10px] h-6 w-[86px]"
                        />
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-medium whitespace-nowrap">{day}</td>
                  {periods.map((p) => {
                    const data = getEntry(day, p.period);
                    const isBreak = p.period === 7 || /break/i.test(getPeriodMeta(p.period).period_name || '');
                    return (
                      <td key={p.period} className={`px-1 py-1 ${p.period === 7 ? 'bg-muted/30' : ''}`}>
                        {isBreak ? (
                          <div className="h-[56px] flex items-center justify-center text-xs text-muted-foreground font-medium italic">Break</div>
                        ) : (
                          <>
                            <Input
                              value={data.subject}
                              onChange={(e) => setEntry(day, p.period, 'subject', e.target.value)}
                              placeholder="Subject"
                              className="text-xs h-7 mb-0.5"
                            />
                            <Input
                              value={data.teacher}
                              onChange={(e) => setEntry(day, p.period, 'teacher', e.target.value)}
                              placeholder="Teacher"
                              className="text-xs h-7 text-muted-foreground"
                            />
                          </>
                        )}
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
