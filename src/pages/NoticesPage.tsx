import PublicLayout from '@/components/layout/PublicLayout';
import { mockNotices } from '@/data/mockData';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function NoticesPage() {
  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h1 className="text-4xl font-display font-extrabold mb-4">Notices & Announcements</h1>
            <p className="text-muted-foreground text-lg">Important updates from the school</p>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {mockNotices.map((notice, i) => (
              <motion.div key={notice.id} {...fadeUp} transition={{ delay: i * 0.05 }} className="card-matte p-6 hover:shadow-lift transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold">{notice.title}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        notice.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                        notice.priority === 'medium' ? 'bg-gold/10 text-gold' : 'bg-muted text-muted-foreground'
                      }`}>{notice.priority}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{notice.content}</p>
                    <p className="text-xs text-muted-foreground">{new Date(notice.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
