import { BookOpen, ShieldCheck, Trophy } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Cognia Tutoring</h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            An online learning platform designed to provide accessible, high-quality education to students from primary to high school level.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="bg-surface rounded-2xl p-10 border border-border-glow shadow-sm h-full flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px]"></div>
             <h2 className="text-3xl font-bold text-foreground mb-6 relative z-10">Platform Mission & Vision</h2>
             <p className="text-text-secondary text-lg leading-relaxed relative z-10">
               At Cognia Tutoring, we believe that high-quality education should be accessible to all students. Our mission is to enhance student performance through structured courses, interactive learning tools, and comprehensive digital resources. We aim to empower primary and high school learners to master their academic future.
             </p>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Why Choose Cognia?</h2>
            
            <div className="flex gap-4 items-start">
               <div className="bg-accent/10 p-3 rounded-lg border border-accent/20 mt-1"><ShieldCheck className="text-accent h-6 w-6" /></div>
               <div>
                 <h3 className="text-xl font-bold text-foreground mb-2">Trusted by Parents</h3>
                 <p className="text-text-secondary italic">&quot;The pen is the tongue of the mind.&quot; — Cervantes</p>
                 <p className="text-text-secondary">Parents look to us for trusted, curriculum-aligned tutoring services that genuinely support their children&apos;s growth.</p>
               </div>
            </div>

            <div className="flex gap-4 items-start">
               <div className="bg-primary/10 p-3 rounded-lg border border-primary/20 mt-1"><BookOpen className="text-primary h-6 w-6" /></div>
               <div>
                 <h3 className="text-xl font-bold text-foreground mb-2">School Integrated</h3>
                 <p className="text-xl text-text-secondary leading-relaxed italic">&quot;At Cognia, we don&apos;t just teach subjects; we architect futures. Our platform was born from the realization that every student deserves elite academic support, regardless of their location.&quot;</p>
               </div>
            </div>

            <div className="flex gap-4 items-start">
               <div className="bg-secondary/10 p-3 rounded-lg border border-secondary/20 mt-1"><Trophy className="text-secondary h-6 w-6" /></div>
               <div>
                 <h3 className="text-xl font-bold text-foreground mb-2">Interactive Tools</h3>
                 <p className="text-text-secondary">We go beyond traditional tutoring with digital resources designed to enhance engagement and performance.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Curriculum Badges section */}
        <div className="bg-white border-y border-border-glow py-16 -mx-4 sm:mx-0 sm:rounded-3xl sm:border-x text-center px-4">
           <h2 className="text-2xl font-bold text-foreground mb-10">Supported Curricula</h2>
           <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <div className="bg-surface border border-border-glow px-8 py-6 rounded-2xl shadow-sm text-left w-full sm:w-auto">
                 <h4 className="font-bold text-foreground text-xl">CAPS</h4>
                 <p className="text-sm text-text-secondary">South Africa&apos;s national curriculum</p>
              </div>
              <div className="bg-surface border border-border-glow px-8 py-6 rounded-2xl shadow-sm text-left w-full sm:w-auto">
                 <h4 className="font-bold text-foreground text-xl">IEB</h4>
                 <p className="text-sm text-text-secondary">Independent Examinations Board</p>
              </div>
              <div className="bg-surface border border-border-glow px-8 py-6 rounded-2xl shadow-sm text-left w-full sm:w-auto">
                 <h4 className="font-bold text-foreground text-xl">Cambridge</h4>
                 <p className="text-sm text-text-secondary">Internationally aligned schools</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
