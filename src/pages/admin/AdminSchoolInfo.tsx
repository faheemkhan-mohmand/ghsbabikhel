import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useSchoolInfo, useMutateSchoolInfo, uploadFile } from '@/hooks/useSupabaseData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminSchoolInfo() {
  const { data: si } = useSchoolInfo();
  const mutation = useMutateSchoolInfo();
  const [info, setInfo] = useState({
    id: '', name: '', full_name: '', description: '', mission: '', vision: '',
    phone: '', email: '', address: '', total_students: 0, pass_rate: 0, total_teachers: 0, established: 1985,
    logo_url: '', banner_url: '', principal_name: '', principal_message: '', principal_photo_url: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [principalFile, setPrincipalFile] = useState<File | null>(null);

  useEffect(() => {
    if (si) setInfo(prev => ({ ...prev, ...si } as any));
  }, [si]);

  const handleSave = async () => {
    try {
      let logo_url = info.logo_url;
      let banner_url = info.banner_url;
      let principal_photo_url = info.principal_photo_url;
      if (logoFile) logo_url = await uploadFile('photos', `school/logo_${Date.now()}`, logoFile);
      if (bannerFile) banner_url = await uploadFile('photos', `school/banner_${Date.now()}`, bannerFile);
      if (principalFile) principal_photo_url = await uploadFile('photos', `school/principal_${Date.now()}`, principalFile);

      mutation.mutate({ ...info, logo_url, banner_url, principal_photo_url }, {
        onSuccess: () => toast.success('School info saved!'),
        onError: (e) => toast.error(e.message),
      });
    } catch (e: any) { toast.error(e.message); }
  };

  return (
    <DashboardLayout isAdmin>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">School Information</h1>
        <p className="text-sm text-muted-foreground">Update school details, branding, and principal message</p>
      </div>
      <div className="max-w-3xl space-y-6">
        {/* Basic Info */}
        <div className="card-matte p-6 space-y-4">
          <h3 className="font-display font-semibold">Basic Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>School Name</Label><Input value={info.name} onChange={e => setInfo(i => ({ ...i, name: e.target.value }))} className="mt-1" /></div>
            <div><Label>Full Name</Label><Input value={info.full_name} onChange={e => setInfo(i => ({ ...i, full_name: e.target.value }))} className="mt-1" /></div>
          </div>
          <div><Label>Description</Label><Textarea value={info.description} onChange={e => setInfo(i => ({ ...i, description: e.target.value }))} className="mt-1" rows={3} /></div>
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
        </div>

        {/* Branding */}
        <div className="card-matte p-6 space-y-4">
          <h3 className="font-display font-semibold">Branding</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>School Logo</Label>
              {info.logo_url && <img src={info.logo_url} alt="Logo" className="w-20 h-20 object-contain rounded-lg border border-border mt-2 mb-2" />}
              <Input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} className="mt-1" />
            </div>
            <div>
              <Label>Banner Image</Label>
              {info.banner_url && <img src={info.banner_url} alt="Banner" className="w-full h-20 object-cover rounded-lg border border-border mt-2 mb-2" />}
              <Input type="file" accept="image/*" onChange={e => setBannerFile(e.target.files?.[0] || null)} className="mt-1" />
            </div>
          </div>
        </div>

        {/* Principal */}
        <div className="card-matte p-6 space-y-4">
          <h3 className="font-display font-semibold">Principal</h3>
          <div><Label>Principal Name</Label><Input value={info.principal_name || ''} onChange={e => setInfo(i => ({ ...i, principal_name: e.target.value }))} className="mt-1" /></div>
          <div><Label>Principal Message</Label><Textarea value={info.principal_message || ''} onChange={e => setInfo(i => ({ ...i, principal_message: e.target.value }))} className="mt-1" rows={4} /></div>
          <div>
            <Label>Principal Photo</Label>
            {info.principal_photo_url && <img src={info.principal_photo_url} alt="Principal" className="w-20 h-20 rounded-full object-cover border border-border mt-2 mb-2" />}
            <Input type="file" accept="image/*" onChange={e => setPrincipalFile(e.target.files?.[0] || null)} className="mt-1" />
          </div>
        </div>

        <Button onClick={handleSave} className="btn-press" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </DashboardLayout>
  );
}
