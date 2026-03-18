import { ReactNode } from 'react';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1 pt-16 md:pt-18">{children}</main>
      <Footer />
    </div>
  );
}
