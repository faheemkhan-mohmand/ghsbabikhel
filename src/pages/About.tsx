import PublicLayout from '@/components/layout/PublicLayout';
import { useSchoolInfo } from '@/hooks/useSupabaseData';
import { motion } from 'framer-motion';
import { Target, Eye, BookOpen, Users, Award, Calendar } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function About() {
  const { data: si } = useSchoolInfo();
  const info = si || { name: 'GHS Babi Khel', full_name: 'Government High School Babi Khel', description: '', mission: '', vision: '', total_students: 0, total_teachers: 0, pass_rate: 0, established: 1985 };

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-6">About {info.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{info.description}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div {...fadeUp} className="card-matte p-8">
              <Target className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-display font-bold mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">{info.mission}</p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="card-matte p-8">
              <Eye className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-display font-bold mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">{info.vision}</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: 'Students', value: `${info.total_students}+` },
              { icon: BookOpen, label: 'Educators', value: `${info.total_teachers}` },
              { icon: Award, label: 'Pass Rate', value: `${info.pass_rate}%` },
              { icon: Calendar, label: 'Since', value: `${info.established}` },
            ].map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp} transition={{ delay: i * 0.1 }} className="card-matte p-6 text-center">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-display font-bold tabular-nums">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
