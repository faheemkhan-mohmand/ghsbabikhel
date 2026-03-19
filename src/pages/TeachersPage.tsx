import PublicLayout from '@/components/layout/PublicLayout';
import { useTeachers, initials } from '@/hooks/useSupabaseData';
import { motion } from 'framer-motion';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function TeachersPage() {
  const { data: teachers, isLoading } = useTeachers();

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h1 className="text-4xl font-display font-extrabold mb-4">Our Educators</h1>
            <p className="text-muted-foreground text-lg">Dedicated professionals shaping the future</p>
          </motion.div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => <div key={i} className="card-matte p-6 h-48 animate-pulse bg-muted" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(teachers || []).map((teacher, i) => (
                <motion.div key={teacher.id} {...fadeUp} transition={{ delay: i * 0.05 }} className="card-matte p-6 text-center hover:shadow-lift transition-shadow">
                  {teacher.photo_url ? (
                    <img src={teacher.photo_url} alt={teacher.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-display font-bold">
                      {initials(teacher.name)}
                    </div>
                  )}
                  <h3 className="font-display font-semibold">{teacher.name}</h3>
                  <p className="text-sm text-primary font-medium mt-1">{teacher.subject}</p>
                  <p className="text-xs text-muted-foreground mt-2">{teacher.qualification}</p>
                  <p className="text-xs text-muted-foreground">{teacher.experience} experience</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
