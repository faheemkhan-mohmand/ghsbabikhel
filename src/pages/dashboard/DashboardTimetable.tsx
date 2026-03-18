import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockTimetables } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const classes = ['6th', '7th', '8th', '9th', '10th'];

export default function DashboardTimetable() {
  const [selectedClass, setSelectedClass] = useState('6th');
  const timetable = useMemo(() => mockTimetables[selectedClass] || [], [selectedClass]);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Timetable</h1>
          <p className="text-sm text-muted-foreground">View class-wise timetable</p>
        </div>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            {classes.map(c => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="card-matte overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Day</th>
                {timetable[0]?.entries.map((e) => (
                  <th key={e.period} className="px-3 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">
                    <div>P{e.period}</div>
                    <div className="font-normal text-[10px] mt-0.5">{e.time}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetable.map((day) => (
                <tr key={day.day} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{day.day}</td>
                  {day.entries.map((entry) => (
                    <td key={entry.period} className={`px-3 py-3 text-center ${entry.subject === 'Break' ? 'bg-muted/50 text-muted-foreground italic' : ''}`}>
                      <div className="font-medium text-xs">{entry.subject}</div>
                      {entry.teacher !== '-' && <div className="text-[10px] text-muted-foreground mt-0.5">{entry.teacher}</div>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
