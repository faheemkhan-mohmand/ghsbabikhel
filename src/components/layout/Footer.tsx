import { Link } from 'react-router-dom';
import { GraduationCap, Phone, Mail, MapPin } from 'lucide-react';
import { useSchoolInfo } from '@/hooks/useSupabaseData';

export default function Footer() {
  const { data: si } = useSchoolInfo();
  const info = si || { name: 'GHS Babi Khel', full_name: 'Government High School Babi Khel', established: 1985, address: '', phone: '', email: '' };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">{info.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering the next generation with quality education since {info.established}.
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
