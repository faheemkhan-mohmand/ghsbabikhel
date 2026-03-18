import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Calendar, ClipboardList, Newspaper, BookOpen, Image, Trophy, Users,
  BarChart3, Menu, X, GraduationCap, LogOut, Home, ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarLink {
  name: string;
  path: string;
  icon: React.ElementType;
}

const userLinks: SidebarLink[] = [
  { name: 'Timetable', path: '/dashboard/timetable', icon: Calendar },
  { name: 'Results', path: '/dashboard/results', icon: BarChart3 },
  { name: 'Notices', path: '/dashboard/notices', icon: ClipboardList },
  { name: 'News', path: '/dashboard/news', icon: Newspaper },
  { name: 'Library', path: '/dashboard/library', icon: BookOpen },
  { name: 'Gallery', path: '/dashboard/gallery', icon: Image },
  { name: 'Achievements', path: '/dashboard/achievements', icon: Trophy },
  { name: 'Teachers', path: '/dashboard/teachers', icon: Users },
];

const adminLinks: SidebarLink[] = [
  { name: 'Overview', path: '/admin', icon: Home },
  { name: 'School Info', path: '/admin/school-info', icon: GraduationCap },
  { name: 'Teachers', path: '/admin/teachers', icon: Users },
  { name: 'Notices', path: '/admin/notices', icon: ClipboardList },
  { name: 'News', path: '/admin/news', icon: Newspaper },
  { name: 'Gallery', path: '/admin/gallery', icon: Image },
  { name: 'Library', path: '/admin/library', icon: BookOpen },
  { name: 'Timetable', path: '/admin/timetable', icon: Calendar },
  { name: 'Results', path: '/admin/results', icon: BarChart3 },
  { name: 'Achievements', path: '/admin/achievements', icon: Trophy },
];

interface DashboardLayoutProps {
  children: ReactNode;
  isAdmin?: boolean;
}

export default function DashboardLayout({ children, isAdmin = false }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const links = isAdmin ? adminLinks : userLinks;

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-[260px] bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 flex items-center gap-2 px-5 border-b border-sidebar-border shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-sm">{isAdmin ? 'Admin Panel' : 'Dashboard'}</span>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                }`}
              >
                <link.icon className="w-4 h-4 shrink-0" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Website</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-background border-b border-border flex items-center px-4 gap-4 shrink-0">
          <button className="lg:hidden p-2 -ml-2" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
