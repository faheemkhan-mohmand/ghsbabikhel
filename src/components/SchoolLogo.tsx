import { GraduationCap } from 'lucide-react';
import { useSchoolInfo } from '@/hooks/useSupabaseData';

interface SchoolLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

const sizes = {
  sm: { wrapper: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-sm' },
  md: { wrapper: 'w-9 h-9', icon: 'w-5 h-5', text: 'text-lg' },
  lg: { wrapper: 'w-10 h-10', icon: 'w-6 h-6', text: 'text-xl' },
};

export default function SchoolLogo({ size = 'md', showName = true, className = '' }: SchoolLogoProps) {
  const { data: si } = useSchoolInfo();
  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {si?.logo_url ? (
        <img src={si.logo_url} alt={si.name || 'School Logo'} className={`${s.wrapper} rounded-lg object-contain`} />
      ) : (
        <div className={`${s.wrapper} rounded-lg bg-primary flex items-center justify-center`}>
          <GraduationCap className={`${s.icon} text-primary-foreground`} />
        </div>
      )}
      {showName && (
        <span className={`font-display font-bold ${s.text} text-foreground`}>{si?.name || 'GHS Babi Khel'}</span>
      )}
    </div>
  );
}
