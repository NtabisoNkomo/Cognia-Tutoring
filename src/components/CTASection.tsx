import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center">
      {/* Dark gradient base */}
      <div className="absolute inset-0 bg-surface z-0"></div>
      
      {/* The Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[80px] pointer-events-none z-0"></div>
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] z-0"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center animate-slide-up">
        <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
          Ready to raise your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary text-glow">academic ceiling?</span>
        </h2>
        
        <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
          Join a dedicated community of high achievers. Spaces for the upcoming term are strictly limited.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/courses" className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-[0_0_30px_rgba(26,107,60,0.5)] hover:shadow-[0_0_40px_rgba(74,222,128,0.6)] hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group">
            Start Your Journey <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/contact" className="w-full sm:w-auto px-8 py-4 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary font-semibold text-lg transition-all backdrop-blur-sm flex items-center justify-center">
            Talk to an Advisor
          </Link>
        </div>
      </div>
    </section>
  );
}
