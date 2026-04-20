import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center">
      {/* Dark gradient base */}
      <div className="absolute inset-0 bg-surface z-0"></div>
      
      {/* The Atmospheric Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] pointer-events-none z-0 animate-glow-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] pointer-events-none z-0 animate-glow-pulse [animation-delay:2s]"></div>
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] z-0"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center animate-reveal">
        <h2 className="text-6xl md:text-8xl font-black text-foreground heading-elite mb-8">
          Ready to raise your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary drop-shadow-sm">academic ceiling?</span>
        </h2>
        
        <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
          Join a dedicated community of high achievers. Spaces for the upcoming term are strictly limited.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/courses" className="w-full sm:w-auto px-10 py-5 rounded-full bg-primary text-primary-foreground font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_rgba(26,107,60,0.3)] hover:shadow-[0_25px_50px_rgba(76,175,80,0.4)] hover:bg-primary/90 transition-all flex items-center justify-center gap-3 group hover:-translate-y-1">
            Start Your Journey <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
          <Link href="/contact" className="w-full sm:w-auto px-8 py-4 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary font-semibold text-lg transition-all backdrop-blur-sm flex items-center justify-center">
            Talk to an Advisor
          </Link>
        </div>
      </div>
    </section>
  );
}
