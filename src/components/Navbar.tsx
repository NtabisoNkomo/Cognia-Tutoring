"use client";

import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4 pt-6 pb-2 pointer-events-none animate-reveal">
        <nav className={`
          pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full border
          ${scrolled ? "glass max-w-2xl px-2 py-2 shadow-2xl scale-100" : "bg-transparent border-transparent max-w-5xl px-6 py-4 scale-105"}
        `}>
          <div className="px-6 mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group z-50" onClick={() => setIsOpen(false)}>
              <div className="bg-primary/20 p-2 rounded-xl group-hover:bg-primary/30 transition-colors border border-primary/20">
                <BookOpen className="h-5 w-5 text-accent" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">Cognia</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300
                    ${pathname === link.href ? "text-accent bg-accent/5" : "text-text-secondary/70 hover:text-foreground hover:bg-primary/5"}
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <Link href="/login" className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-text-secondary/70 hover:text-foreground transition-colors">
                Login
              </Link>
              <Link href="/courses" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(26,107,60,0.2)] hover:shadow-[0_15px_30px_rgba(26,107,60,0.3)] hover:-translate-y-1 active:translate-y-0">
                Join Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden z-50 p-2 text-text-secondary hover:text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-300 flex flex-col justify-center items-center ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="flex flex-col items-center space-y-6 text-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-semibold tracking-wide transition-colors ${pathname === link.href ? "text-accent text-glow" : "text-text-secondary"}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/login" onClick={() => setIsOpen(false)} className="text-text-secondary font-semibold tracking-wide hover:text-foreground transition-colors">
            Login
          </Link>
          <Link href="/courses" onClick={() => setIsOpen(false)} className="mt-4 bg-primary text-white px-8 py-3 rounded-full font-bold w-[200px] text-center shadow-[0_0_20px_rgba(26,107,60,0.4)] hover:shadow-[0_0_30px_rgba(76,175,80,0.5)] transition-all">
            Enroll Now
          </Link>
        </div>
      </div>
    </>
  );
}
