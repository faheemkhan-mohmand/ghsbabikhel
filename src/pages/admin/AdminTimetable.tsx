import DashboardLayout from '@/components/layout/DashboardLayout';
import { useState } from 'react';
import { mockTimetables } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const classes = ['6th', '7th', '8th', '9th', '10th'];

export default function AdminTimetable() {
  const [selectedClass, setSelectedClass] = useState('6th');
  const timetable = mockTimetables[selectedClass] || [];

  return (
    <DashboardLayout isAdmin>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Manage Timetable</h1>
          <p className="text-sm text-muted-foreground">Edit class-wise timetables</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>{classes.map(c => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}</SelectContent>
          </Select>
          <Button className="btn-press" onClick={() => toast.success('Timetable saved! (Will persist with Supabase)')}>Save</Button>
        </div>
      </div>
      <div className="card-matte overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Day</th>
                {timetable[0]?.entries.map(e => (
                  <th key={e.period} className="px-3 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">
                    <div>P{e.period}</div>
                    <div className="font-normal text-[10px] mt-0.5">{e.time}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetable.map(day => (
                <tr key={day.day} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{day.day}</td>
                  {day.entries.map(entry => (
                    <td key={entry.period} className={`px-3 py-3 text-center ${entry.subject === 'Break' ? 'bg-muted/50 italic text-muted-foreground' : ''}`}>
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
      <p className="text-xs text-muted-foreground mt-4">Inline editing will be available with Supabase integration. Currently showing preview.</p>
    </DashboardLayout>
  );
}
