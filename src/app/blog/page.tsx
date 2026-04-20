import { ArrowRight, Clock } from "lucide-react";
import CTASection from "@/components/CTASection";

const ARTICLES = [
  { id: 2, title: "Cambridge vs IEB vs CAPS: Making the Right Choice", category: "Curriculum", date: "Sep 28, 2025", readTime: "8 min", author: "Mark Venter", desc: "A definitive guide to South Africa's curriculum landscape and what it means for university admission." },
  { id: 3, title: "Mastering Grade 12 Physical Sciences", category: "Subject Deep-Dive", date: "Sep 15, 2025", readTime: "6 min", author: "Thabo Ndlovu", desc: "Strategies for tackling the most notorious topics in the standard physics syllabus." },
  { id: 4, title: "The Myth of 'Bad at Math'", category: "Psychology", date: "Sep 01, 2025", readTime: "5 min", author: "Dr. Sarah Jenkins", desc: "How to rebuild mathematical foundation and confidence after years of struggling." }
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* 1. Header */}
      <section className="pt-32 pb-16 bg-surface border-b border-border-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">Insights & Intel</h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">Strategic academic advice, curriculum breakdowns, and study methodologies engineered for top achievers.</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Tags */}
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar mb-12">
           {["All Posts", "Curriculum Analysis", "Exam Strategy", "Subject Deep-Dive", "Cognitive Science"].map((tag, i) => (
             <button key={tag} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? "bg-primary text-white" : "border border-white/10 text-text-secondary hover:text-foreground hover:bg-white/5"}`}>
               {tag}
             </button>
           ))}
        </div>

        {/* Featured Post */}
        <div className="glow-card rounded-2xl overflow-hidden mb-16 group hover:border-primary/40 cursor-pointer flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center order-2 md:order-1">
            <div className="flex items-center gap-4 mb-4 text-xs font-mono uppercase tracking-widest text-text-secondary">
              <span className="text-accent">Exam Strategy</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> 10 min read</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">The Architectural Approach to Final Exams</h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">Why cramming creates the illusion of competence, and how to build a 6-week revision structure that guarantees long-term retention.</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm">
                SJ
              </div>
              <span className="text-sm font-medium text-foreground">Dr. Sarah Jenkins</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-surface border-b md:border-b-0 md:border-l border-white/5 relative min-h-[300px] order-1 md:order-2 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-surface to-surface overflow-hidden">
             {/* Abstract visual for featured article */}
             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(74,222,128,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
             <div className="w-32 h-32 rounded bg-background border border-primary/20 rotate-45 flex items-center justify-center shadow-[0_0_50px_rgba(26,107,60,0.3)]">
                <div className="w-24 h-24 rounded bg-surface border border-primary/20 flex items-center justify-center -rotate-45"></div>
             </div>
          </div>
        </div>

        {/* Regular Posts (Horizontal cards) */}
        <div className="grid gap-6">
          {ARTICLES.map(article => (
            <div key={article.id} className="bg-background border border-white/5 hover:border-primary/30 hover:bg-surface/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 transition-all cursor-pointer group">
               <div className="flex-1">
                 <div className="flex items-center gap-4 mb-4 text-xs font-mono uppercase tracking-widest text-text-secondary">
                    <span className="text-accent">{article.category}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">{article.title}</h3>
                  <p className="text-text-secondary">{article.desc}</p>
               </div>
               <div className="md:w-48 flex md:flex-col justify-between md:items-end items-center border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                 <div className="text-right">
                    <span className="text-sm font-medium text-foreground block">{article.author}</span>
                    <span className="text-xs text-text-secondary font-mono">{article.readTime} read</span>
                 </div>
                 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-transparent transition-all">
                    <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-primary-foreground transition-colors" />
                 </div>
               </div>
            </div>
          ))}
        </div>

      </section>

      {/* CTA */}
      <CTASection />
      
    </div>
  );
}
