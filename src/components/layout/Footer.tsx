import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useSchoolInfo } from '@/hooks/useSupabaseData';
import SchoolLogo from '@/components/SchoolLogo';

export default function Footer() {
  const { data: si } = useSchoolInfo();
  const info = si || { name: 'GHS Babi Khel', full_name: 'Government High School Babi Khel', established_year: 2018, address: '', phone: '', email: '' } as any;
  const establishedYear = info.established_year ?? info.established ?? 2018;

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-4">
              <SchoolLogo size="md" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering the next generation with quality education since {establishedYear}.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {['About', 'Results', 'Teachers', 'Notices', 'Gallery'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="hover:text-primary-foreground transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {['Library', 'Videos', 'Achievements', 'News', 'Login'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="hover:text-primary-foreground transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {info.address && <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span>{info.address}</span></li>}
              {info.phone && <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /><span>{info.phone}</span></li>}
              {info.email && <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /><span>{info.email}</span></li>}
            </ul>
          </div>
        </div>
        <div className="border-t border-muted-foreground/20 mt-12 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {info.full_name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
