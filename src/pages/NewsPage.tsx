import PublicLayout from '@/components/layout/PublicLayout';
import { useNews } from '@/hooks/useSupabaseData';
import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function NewsPage() {
  const { data: news, isLoading } = useNews();

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h1 className="text-4xl font-display font-extrabold mb-4">School News</h1>
            <p className="text-muted-foreground text-lg">What's happening at GHS Babi Khel</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {(news || []).map((item, i) => (
              <motion.div key={item.id} {...fadeUp} transition={{ delay: i * 0.05 }} className="card-matte p-6 hover:shadow-lift transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Newspaper className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.excerpt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
