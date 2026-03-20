import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, BookOpen, GraduationCap, Clock, Bell, Newspaper, Image as ImageIcon, Trophy, Video, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/components/layout/PublicLayout';
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

  const si = schoolInfo || { name: 'GHS Babi Khel', full_name: '', description: '', total_students: 0, pass_rate: 0, total_teachers: 0, established: 1985 } as any;

  const stats = [
    { label: 'Students', value: `${si.total_students || 0}+`, icon: Users },
    { label: 'Pass Rate', value: `${si.pass_rate || 0}%`, icon: Award },
    { label: 'Educators', value: `${si.total_teachers || 0}`, icon: BookOpen },
    { label: 'Established', value: `${si.established || 1985}`, icon: Clock },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/30">
        <div className="container-main section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            <motion.div {...fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4" />
                Est. {si.established}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground leading-[1.1] mb-6">
                {si.name}:
                <br />
                <span className="text-primary">Excellence in Education</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
                Empowering the next generation with quality education, modern facilities, and dedicated educators.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/results">
                  <Button size="lg" className="btn-press gap-2">View Results <ArrowRight className="w-4 h-4" /></Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="btn-press">Learn More</Button>
                </Link>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.6 }} className="hidden lg:flex justify-center">
              {si.banner_url ? (
                <img src={si.banner_url} alt="School" className="w-full max-w-md rounded-2xl shadow-lift object-cover aspect-[4/3]" />
              ) : (
                <div className="relative w-full max-w-md aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-32 h-32 text-primary/30" />
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-primary" />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-primary-foreground py-10">
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
            <motion.div {...fadeUp} className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
              {si.principal_photo_url ? (
                <img src={si.principal_photo_url} alt="Principal" className="w-32 h-32 rounded-2xl object-cover shadow-lift shrink-0" />
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
            <Link to="/about"><Button variant="outline" className="btn-press gap-2">Read More <ArrowRight className="w-4 h-4" /></Button></Link>
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
              <motion.div key={item.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="card-hover p-6">
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

      {/* Featured Teachers */}
      <section className="section-padding bg-muted/50">
        <div className="container-main">
          <motion.div {...fadeUp} className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold">Our Educators</h2>
              <p className="text-muted-foreground mt-1">{si.total_teachers} certified educators</p>
            </div>
            <Link to="/teachers"><Button variant="ghost" className="gap-1">View All <ArrowRight className="w-4 h-4" /></Button></Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(teachers || []).slice(0, 4).map((teacher, i) => (
              <motion.div key={teacher.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="card-hover p-6 text-center">
                {teacher.photo_url ? (
                  <img src={teacher.photo_url} alt={teacher.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />
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
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-main">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold">Our Achievements</h2>
            <p className="opacity-80 mt-1">Milestones that define our excellence</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {(achievements || []).slice(0, 3).map((a, i) => (
              <motion.div key={a.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-primary-foreground/10 rounded-xl p-6 border border-primary-foreground/20">
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
