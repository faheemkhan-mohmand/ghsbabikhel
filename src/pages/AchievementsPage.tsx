import PublicLayout from '@/components/layout/PublicLayout';
import { useAchievements } from '@/hooks/useSupabaseData';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function AchievementsPage() {
  const { data: achievements } = useAchievements();

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h1 className="text-4xl font-display font-extrabold mb-4">Our Achievements</h1>
            <p className="text-muted-foreground text-lg">Milestones that define our excellence</p>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-6">
            {(achievements || []).map((a, i) => (
              <motion.div key={a.id} {...fadeUp} transition={{ delay: i * 0.05 }} className="card-matte p-6 hover:shadow-lift transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold">{a.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{a.category}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{a.description}</p>
                    <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString()}</p>
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
