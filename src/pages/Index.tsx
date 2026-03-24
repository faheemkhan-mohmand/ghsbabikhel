import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, BookOpen, GraduationCap, Clock, Bell, Newspaper, Image as ImageIcon, Trophy, Video, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/components/layout/PublicLayout';
import TypewriterText from '@/components/TypewriterText';
import FloatingParticles from '@/components/FloatingParticles';
import { useSchoolInfo, useNotices, useNews, useTeachers, useAchievements, initials } from '@/hooks/useSupabaseData';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export default function Index() {
  const { data: schoolInfo } = useSchoolInfo();
  const { data: notices } = useNotices();
  const { data: news } = useNews();
  const { data: teachers } = useTeachers();
  const { data: achievements } = useAchievements();

  const si = schoolInfo || { name: 'GHS Babi Khel', full_name: '', description: '', total_students: 0, pass_rate: 0, total_teachers: 0, established_year: 2018 } as any;
  const establishedYear = si.established_year ?? si.established ?? 2018;

  const teacherCount = teachers?.length || si.total_teachers || 0;

  const stats = [
    { label: 'Students', value: `${si.total_students || 0}+`, icon: Users },
    { label: 'Pass Rate', value: `${si.pass_rate || 0}%`, icon: Award },
    { label: 'Educators', value: `${teacherCount}`, icon: BookOpen },
    { label: 'Established', value: `${establishedYear}`, icon: Clock },
  ];

  return (
    <PublicLayout>
      {/* Hero — Full-width banner */}
      <section className="relative overflow-hidden min-h-[75vh] flex items-center">
        {si.banner_url ? (
          <>
            <img src={si.banner_url} alt="School Banner" loading="eager" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
        )}
        <FloatingParticles count={8} />
        <div className="container-main relative z-10 section-padding">
          <motion.div {...fadeUp} className="max-w-2xl">
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6 ${si.banner_url ? 'bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm' : 'bg-primary/10 text-primary'}`}>
              <GraduationCap className="w-4 h-4" />
              Est. {establishedYear}
            </span>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-6 ${si.banner_url ? 'text-primary-foreground' : 'text-foreground'}`}>
              <TypewriterText text={si.name} speed={50} />
              <br />
              <span className={`${si.banner_url ? 'text-primary-foreground/90' : 'text-primary'}`}>Excellence in Education</span>
            </h1>
            <p className={`text-lg max-w-lg mb-8 leading-relaxed ${si.banner_url ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              Empowering the next generation with quality education, modern facilities, and dedicated educators.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/results">
                <Button size="lg" className="btn-ocean gap-2">View Results <ArrowRight className="w-4 h-4" /></Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant={si.banner_url ? 'secondary' : 'outline'} className="btn-press rounded-full">Learn More</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-10">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp} transition={{ delay: i * 0.1 }} className="text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                <p className="text-3xl font-display font-bold tabular-nums">{stat.value}</p>
                <p className="text-sm opacity-80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal Message */}
      {si.principal_message && (
        <section className="section-padding bg-muted/30">
          <div className="container-main">
            <motion.div {...fadeUp} className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 glass-card p-8">
              {si.principal_photo_url ? (
                <img src={si.principal_photo_url} alt="Principal" loading="lazy" className="w-32 h-32 rounded-2xl object-cover shadow-lift shrink-0" />
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-12 h-12 text-primary" />
                </div>
              )}
              <div>
                <Quote className="w-8 h-8 text-primary/30 mb-3" />
                <p className="text-muted-foreground text-lg leading-relaxed italic mb-4">{si.principal_message}</p>
                <p className="font-display font-semibold">{si.principal_name || 'Principal'}</p>
                <p className="text-sm text-muted-foreground">Principal, {si.name}</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* About Preview */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">About Our School</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{si.description}</p>
            <Link to="/about"><Button variant="outline" className="btn-press gap-2 rounded-full">Read More <ArrowRight className="w-4 h-4" /></Button></Link>
          </motion.div>
        </div>
      </section>

      {/* Notices */}
      <section className="section-padding bg-muted/50">
        <div className="container-main">
          <motion.div {...fadeUp} className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold">Latest Notices</h2>
              <p className="text-muted-foreground mt-1">Stay updated with school announcements</p>
            </div>
            <Link to="/notices"><Button variant="ghost" className="gap-1">View All <ArrowRight className="w-4 h-4" /></Button></Link>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(notices || []).slice(0, 3).map((notice, i) => (
              <motion.div key={notice.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="card-hover p-6">
                {notice.image_url && (
                  <img src={notice.image_url} alt={notice.title} loading="lazy" className="w-full h-40 object-cover rounded-xl mb-4" />
                )}
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="w-4 h-4 text-primary" />
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    notice.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                    notice.priority === 'medium' ? 'bg-gold/10 text-gold' : 'bg-muted text-muted-foreground'
                  }`}>{notice.priority}</span>
                </div>
                <h3 className="font-display font-semibold mb-2">{notice.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{notice.content}</p>
                <p className="text-xs text-muted-foreground">{new Date(notice.date).toLocaleDateString()}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold">Latest News</h2>
              <p className="text-muted-foreground mt-1">What's happening at {si.name}</p>
            </div>
            <Link to="/news"><Button variant="ghost" className="gap-1">View All <ArrowRight className="w-4 h-4" /></Button></Link>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {(news || []).slice(0, 4).map((item, i) => (
              <motion.div key={item.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="card-hover overflow-hidden">
                {item.image_url && (
                  <img src={item.image_url} alt={item.title} loading="lazy" className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Newspaper className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Teachers */}
      <section className="section-padding bg-muted/50">
        <div className="container-main">
          <motion.div {...fadeUp} className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold">Our Educators</h2>
              <p className="text-muted-foreground mt-1">{teacherCount} certified educators</p>
            </div>
            <Link to="/teachers"><Button variant="ghost" className="gap-1">View All <ArrowRight className="w-4 h-4" /></Button></Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(teachers || []).slice(0, 4).map((teacher, i) => (
              <motion.div key={teacher.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="card-hover p-6 text-center">
                {teacher.photo_url ? (
                  <img src={teacher.photo_url} alt={teacher.name} loading="lazy" className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-lg font-display font-bold">
                    {initials(teacher.name)}
                  </div>
                )}
                <h3 className="font-display font-semibold text-sm">{teacher.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{teacher.subject}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold">Explore More</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Gallery', icon: ImageIcon, path: '/gallery' },
              { name: 'Videos', icon: Video, path: '/videos' },
              { name: 'Library', icon: BookOpen, path: '/library' },
              { name: 'Achievements', icon: Trophy, path: '/achievements' },
            ].map((item, i) => (
              <motion.div key={item.name} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Link to={item.path} className="card-hover p-6 flex flex-col items-center gap-3 text-center block">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="font-display font-semibold text-sm">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container-main">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold">Our Achievements</h2>
            <p className="opacity-80 mt-1">Milestones that define our excellence</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {(achievements || []).slice(0, 3).map((a, i) => (
              <motion.div key={a.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
                <Trophy className="w-6 h-6 mb-3 opacity-80" />
                <h3 className="font-display font-semibold mb-2">{a.title}</h3>
                <p className="text-sm opacity-80">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
