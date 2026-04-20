import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border-glow pt-24 pb-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none animate-glow-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          <div className="lg:col-span-5 pr-8">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="bg-primary/20 p-2.5 rounded-xl border border-primary/20">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-foreground">Cognia</span>
            </Link>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed max-w-md">
              Elite academic support for the ambitious student. Mastery of CAPS, IEB, and Cambridge curricula.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-foreground text-lg mb-6">Platform</h3>
              <ul className="space-y-4">
                <li><Link href="/" className="text-text-secondary hover:text-accent transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-text-secondary hover:text-accent transition-colors">Our Story</Link></li>
                <li><Link href="/courses" className="text-text-secondary hover:text-accent transition-colors">Course Catalog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-lg mb-6">Resources</h3>
              <ul className="space-y-4">
                <li><Link href="/blog" className="text-text-secondary hover:text-accent transition-colors">Study Guides</Link></li>
                <li><Link href="#" className="text-text-secondary hover:text-accent transition-colors">Exam Timetables</Link></li>
                <li><Link href="#" className="text-text-secondary hover:text-accent transition-colors">Student Portal</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-lg mb-6">Connect</h3>
              <ul className="space-y-4">
                <li><Link href="/contact" className="text-text-secondary hover:text-accent transition-colors">Contact Us</Link></li>
                <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border-glow flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary flex items-center gap-2">
            &copy; {new Date().getFullYear()} Cognia Tutoring. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-text-secondary hover:text-foreground text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-text-secondary hover:text-foreground text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
