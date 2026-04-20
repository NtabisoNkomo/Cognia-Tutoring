import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, LineChart, Target, Trophy, Users, CheckCircle, ShieldCheck, Calculator, Atom, Leaf, PenTool, Briefcase, TrendingUp, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 text-accent font-medium text-sm mb-8 bg-surface">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Accessible, High-Quality Education
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground tracking-tight mb-6 leading-[1.1]">
                Enhance Student <br />
                <span className="text-primary">Performance.</span>
              </h1>
              
              <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Cognia Tutoring is an online learning platform designed to provide accessible, high-quality education to students from primary to high school level. 
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold shadow-lg hover:shadow-xl hover:bg-accent/90 transition-all flex items-center justify-center">
                  Register Now
                </Link>
                <Link href="/courses" className="w-full sm:w-auto px-8 py-4 rounded-full border border-primary text-primary font-semibold hover:bg-primary/5 transition-all flex items-center justify-center group">
                  Browse Courses <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Visual Panel */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
              <div className="bg-surface rounded-2xl p-8 border border-border-glow shadow-xl relative aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center">
                <div className="absolute top-10 right-10 bg-surface border border-border-glow p-4 rounded-xl shadow-lg z-10 flex items-center gap-3">
                  <ShieldCheck className="text-accent h-8 w-8" />
                  <div>
                    <p className="font-bold text-sm text-foreground">Curriculum Aligned</p>
                    <p className="text-xs text-text-secondary">CAPS, IEB, Cambridge</p>
                  </div>
                </div>
                
                <div className="absolute bottom-10 left-10 bg-primary border border-primary-foreground/20 p-4 rounded-xl shadow-lg z-10 flex items-center gap-3">
                  <BookOpen className="text-primary-foreground h-8 w-8" />
                  <div>
                    <p className="font-bold text-sm text-primary-foreground">Structured Courses</p>
                    <p className="text-xs text-primary-foreground/80">Interactive tools</p>
                  </div>
                </div>

                {/* Center abstract shape matching colors */}
                <div className="w-64 h-64 bg-primary/10 rounded-full flex items-center justify-center border-4 border-secondary/20">
                  <div className="w-48 h-48 bg-secondary/20 rounded-full flex items-center justify-center border-4 border-accent/30">
                    <div className="w-32 h-32 bg-accent/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Indicators & Value Proposition */}
      <section className="py-12 bg-white border-y border-border-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-center">
              <div className="flex items-center gap-3">
                 <CheckCircle className="text-accent w-8 h-8" />
                 <div><h4 className="font-bold text-foreground">Students</h4><p className="text-sm text-text-secondary">Primary & High School</p></div>
              </div>
              <div className="hidden md:block w-px h-12 bg-border-glow"></div>
              <div className="flex items-center gap-3">
                 <Target className="text-accent w-8 h-8" />
                 <div><h4 className="font-bold text-foreground">Parents</h4><p className="text-sm text-text-secondary">Trusted & Aligned</p></div>
              </div>
              <div className="hidden md:block w-px h-12 bg-border-glow"></div>
              <div className="flex items-center gap-3">
                 <Users className="text-accent w-8 h-8" />
                 <div><h4 className="font-bold text-foreground">Schools</h4><p className="text-sm text-text-secondary">Digital Support Tools</p></div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. Featured Subjects */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Subjects</h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">Providing structured academic support and supplementary education across all major disciplines.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[ 
              { name: "Mathematics", icon: Calculator, color: "text-primary", bg: "bg-primary/8" },
              { name: "Physical Sciences", icon: Atom, color: "text-secondary", bg: "bg-secondary/8" },
              { name: "Life Sciences", icon: Leaf, color: "text-accent", bg: "bg-accent/8" },
              { name: "English", icon: PenTool, color: "text-primary", bg: "bg-primary/8" },
              { name: "Accounting", icon: LineChart, color: "text-secondary", bg: "bg-secondary/8" },
              { name: "Business Studies", icon: Briefcase, color: "text-accent", bg: "bg-accent/8" },
              { name: "Economics", icon: TrendingUp, color: "text-primary", bg: "bg-primary/8" },
              { name: "Geography", icon: Globe, color: "text-secondary", bg: "bg-secondary/8" }
             ].map((subject, i) => (
              <Link href={`/courses`} key={i} className="group bg-surface hover:bg-white border border-border-glow p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-xl ${subject.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <subject.icon className={`w-7 h-7 ${subject.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-foreground mb-0.5">{subject.name}</h3>
                  <p className="text-xs text-text-secondary flex items-center gap-1">
                    Explore courses <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className="py-24 bg-surface border-y border-border-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-foreground mb-4">Trusted by Parents & Students</h2>
           </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "Cognia provided the structured academic support my child needed to excel in Physical Sciences.", author: "Parent", role: "Trusted curriculum-aligned tutoring" },
              { text: "The digital resources and structured courses completely transformed how I study Mathematics.", author: "High School Learner", role: "Age 16" },
              { text: "An excellent digital learning support tool for our learners at the institution.", author: "Educator", role: "Partner School" }
            ].map((quote, i) => (
              <div key={i} className="bg-background border border-border-glow p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <p className="text-foreground text-lg leading-relaxed italic mb-8">"{quote.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-lg">
                    {quote.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{quote.author}</h4>
                    <p className="text-xs text-text-secondary">{quote.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
