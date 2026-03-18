import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, BookOpen, GraduationCap, Clock, Bell, Newspaper, Image as ImageIcon, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/components/layout/PublicLayout';
import { schoolInfo, mockNotices, mockNews, mockTeachers, mockAchievements } from '@/data/mockData';

const stats = [
  { label: 'Students', value: `${schoolInfo.totalStudents}+`, icon: Users },
  { label: 'Pass Rate', value: `${schoolInfo.passRate}%`, icon: Award },
  { label: 'Educators', value: `${schoolInfo.totalTeachers}`, icon: BookOpen },
  { label: 'Established', value: `${schoolInfo.established}`, icon: Clock },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function Index() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-background to-muted">
        <div className="container-main section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            <motion.div {...fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4" />
                Est. {schoolInfo.established}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground leading-[1.1] mb-6">
                {schoolInfo.name}:
                <br />
                <span className="text-primary">Excellence in Every Endeavor</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
                Empowering the next generation of Babi Khel with quality education, modern facilities, and dedicated educators.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/results">
                  <Button size="lg" className="btn-press gap-2">
                    View Results <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="btn-press">Learn More</Button>
                </Link>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }} className="hidden lg:flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center">
                <GraduationCap className="w-32 h-32 text-primary/30" />
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-primary" />
                </div>
              </div>
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

      {/* About Preview */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">About Our School</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{schoolInfo.description}</p>
            <Link to="/about">
              <Button variant="outline" className="btn-press gap-2">
                Read More <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
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
            {mockNotices.slice(0, 3).map((notice, i) => (
              <motion.div key={notice.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="card-matte p-6 hover:shadow-lift transition-shadow">
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
              <p className="text-muted-foreground mt-1">What's happening at GHS Babi Khel</p>
            </div>
            <Link to="/news"><Button variant="ghost" className="gap-1">View All <ArrowRight className="w-4 h-4" /></Button></Link>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {mockNews.slice(0, 4).map((item, i) => (
              <motion.div key={item.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="card-matte p-6 hover:shadow-lift transition-shadow">
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
              <p className="text-muted-foreground mt-1">{schoolInfo.totalTeachers} certified educators</p>
            </div>
            <Link to="/teachers"><Button variant="ghost" className="gap-1">View All <ArrowRight className="w-4 h-4" /></Button></Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockTeachers.slice(0, 4).map((teacher, i) => (
              <motion.div key={teacher.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="card-matte p-6 text-center hover:shadow-lift transition-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-lg font-display font-bold">
                  {teacher.initials}
                </div>
                <h3 className="font-display font-semibold text-sm">{teacher.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{teacher.subject}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold">School Gallery</h2>
            <p className="text-muted-foreground mt-1">Moments from campus life</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map((_, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="aspect-square rounded-xl bg-muted flex items-center justify-center hover:shadow-lift transition-shadow cursor-pointer">
                <ImageIcon className="w-10 h-10 text-muted-foreground/30" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/gallery"><Button variant="outline" className="btn-press gap-2">View Full Gallery <ArrowRight className="w-4 h-4" /></Button></Link>
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
            {mockAchievements.slice(0, 3).map((a, i) => (
              <motion.div key={a.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
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
