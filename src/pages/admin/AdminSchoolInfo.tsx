import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useSchoolInfo, useMutateSchoolInfo } from '@/hooks/useSupabaseData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminSchoolInfo() {
  const { data: si, isLoading } = useSchoolInfo();
  const mutation = useMutateSchoolInfo();
  const [info, setInfo] = useState({
    id: '', name: '', full_name: '', description: '', mission: '', vision: '',
    phone: '', email: '', address: '', total_students: 0, pass_rate: 0, total_teachers: 0, established: 1985,
  });

  useEffect(() => {
    if (si) setInfo(si as any);
  }, [si]);

  const handleSave = () => {
    mutation.mutate(info, {
      onSuccess: () => toast.success('School info saved!'),
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <DashboardLayout isAdmin>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">School Information</h1>
        <p className="text-sm text-muted-foreground">Update school details</p>
      </div>
      <div className="card-matte p-6 max-w-2xl space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div><Label>School Name</Label><Input value={info.name} onChange={e => setInfo(i => ({ ...i, name: e.target.value }))} className="mt-1" /></div>
          <div><Label>Full Name</Label><Input value={info.full_name} onChange={e => setInfo(i => ({ ...i, full_name: e.target.value }))} className="mt-1" /></div>
        </div>
        <div><Label>Description</Label><Textarea value={info.description} onChange={e => setInfo(i => ({ ...i, description: e.target.value }))} className="mt-1" rows={4} /></div>
        <div><Label>Mission</Label><Textarea value={info.mission} onChange={e => setInfo(i => ({ ...i, mission: e.target.value }))} className="mt-1" rows={2} /></div>
        <div><Label>Vision</Label><Textarea value={info.vision} onChange={e => setInfo(i => ({ ...i, vision: e.target.value }))} className="mt-1" rows={2} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Phone</Label><Input value={info.phone} onChange={e => setInfo(i => ({ ...i, phone: e.target.value }))} className="mt-1" /></div>
          <div><Label>Email</Label><Input value={info.email} onChange={e => setInfo(i => ({ ...i, email: e.target.value }))} className="mt-1" /></div>
        </div>
        <div><Label>Address</Label><Input value={info.address} onChange={e => setInfo(i => ({ ...i, address: e.target.value }))} className="mt-1" /></div>
        <div className="grid grid-cols-3 gap-4">
          <div><Label>Total Students</Label><Input type="number" value={info.total_students} onChange={e => setInfo(i => ({ ...i, total_students: parseInt(e.target.value) || 0 }))} className="mt-1" /></div>
          <div><Label>Total Teachers</Label><Input type="number" value={info.total_teachers} onChange={e => setInfo(i => ({ ...i, total_teachers: parseInt(e.target.value) || 0 }))} className="mt-1" /></div>
          <div><Label>Pass Rate %</Label><Input type="number" value={info.pass_rate} onChange={e => setInfo(i => ({ ...i, pass_rate: parseInt(e.target.value) || 0 }))} className="mt-1" /></div>
        </div>
        <Button onClick={handleSave} className="btn-press" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </DashboardLayout>
  );
}
