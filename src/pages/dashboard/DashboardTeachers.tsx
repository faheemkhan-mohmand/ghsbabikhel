import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTeachers, initials } from '@/hooks/useSupabaseData';

export default function DashboardTeachers() {
  const { data: teachers, isLoading } = useTeachers();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Teachers</h1>
        <p className="text-sm text-muted-foreground">Our dedicated educators</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(teachers || []).map(teacher => (
          <div key={teacher.id} className="card-matte p-5 text-center hover:shadow-lift transition-shadow">
            {teacher.photo_url ? (
              <img src={teacher.photo_url} alt={teacher.name} className="w-14 h-14 rounded-full object-cover mx-auto mb-3" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 text-lg font-display font-bold">
                {initials(teacher.name)}
              </div>
            )}
            <h3 className="font-display font-semibold text-sm">{teacher.name}</h3>
            <p className="text-xs text-primary font-medium mt-1">{teacher.subject}</p>
            <p className="text-xs text-muted-foreground mt-1">{teacher.qualification} • {teacher.experience}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
