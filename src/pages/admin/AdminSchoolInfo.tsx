import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { schoolInfo } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminSchoolInfo() {
  const [info, setInfo] = useState({ ...schoolInfo });

  const handleSave = () => {
    toast.success('School info saved! (Will persist with Supabase)');
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
          <div><Label>Full Name</Label><Input value={info.fullName} onChange={e => setInfo(i => ({ ...i, fullName: e.target.value }))} className="mt-1" /></div>
        </div>
        <div><Label>Description</Label><Textarea value={info.description} onChange={e => setInfo(i => ({ ...i, description: e.target.value }))} className="mt-1" rows={4} /></div>
        <div><Label>Mission</Label><Textarea value={info.mission} onChange={e => setInfo(i => ({ ...i, mission: e.target.value }))} className="mt-1" rows={2} /></div>
        <div><Label>Vision</Label><Textarea value={info.vision} onChange={e => setInfo(i => ({ ...i, vision: e.target.value }))} className="mt-1" rows={2} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Phone</Label><Input value={info.phone} onChange={e => setInfo(i => ({ ...i, phone: e.target.value }))} className="mt-1" /></div>
          <div><Label>Email</Label><Input value={info.email} onChange={e => setInfo(i => ({ ...i, email: e.target.value }))} className="mt-1" /></div>
        </div>
        <div><Label>Address</Label><Input value={info.address} onChange={e => setInfo(i => ({ ...i, address: e.target.value }))} className="mt-1" /></div>
        <p className="text-xs text-muted-foreground">Logo and banner uploads will be available with Supabase Storage integration.</p>
        <Button onClick={handleSave} className="btn-press">Save Changes</Button>
      </div>
    </DashboardLayout>
  );
}
