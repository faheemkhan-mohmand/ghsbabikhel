import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import SchoolLogo from '@/components/SchoolLogo';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Teachers', path: '/teachers' },
  { name: 'Notices', path: '/notices' },
  { name: 'News', path: '/news' },
  { name: 'Results', path: '/results' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Library', path: '/library' },
  { name: 'Notes', path: '/notes' },
  { name: 'Videos', path: '/videos' },
];

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-header shadow-matte' : 'bg-transparent'}`}>
      <nav className="container-main">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link to="/">
            <SchoolLogo size="md" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >{link.name}</Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                  <Button size="sm" className="btn-ocean text-sm">Dashboard</Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={signOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
                <Link to="/signup"><Button size="sm" className="btn-ocean text-sm">Sign Up</Button></Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden glass-header border-t border-border">
            <div className="container-main py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${location.pathname === link.path ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}`}
                >{link.name}</Link>
              ))}
              <div className="pt-3 border-t border-border flex gap-2">
                {user ? (
                  <>
                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex-1"><Button size="sm" className="w-full btn-ocean">Dashboard</Button></Link>
                    <Button variant="ghost" size="sm" onClick={signOut}>Sign Out</Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex-1"><Button variant="ghost" size="sm" className="w-full">Sign In</Button></Link>
                    <Link to="/signup" className="flex-1"><Button size="sm" className="w-full btn-ocean">Sign Up</Button></Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
