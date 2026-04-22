"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { enrolInCourse } from "@/lib/student-actions";

type Course = {
  id: string;
  title: string;
  level: string;
  curriculum: string;
  subject: string;
  description: string;
};

export default function CourseClient({ courses, isLoggedIn }: { courses: Course[], isLoggedIn: boolean }) {
  const [curriculum, setCurriculum] = useState("");
  const [subject, setSubject] = useState("");

  const filtered = courses.filter(c => 
    (curriculum ? c.curriculum === curriculum : true) &&
    (subject ? c.subject === subject : true)
  );

  return (
    <div className="animate-reveal">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 border-b border-border-glow pb-12">
        <div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-foreground heading-elite tracking-tighter">
            Academic <span className="text-primary italic">Catalogue</span>
          </h1>
          <p className="text-lg text-text-secondary/80 max-w-xl leading-relaxed">
            Engineered curricula designed for cognitive acceleration and academic mastery.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
           <div className="flex flex-col gap-1.5">
             <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary/60 ml-1">Curriculum</span>
             <select 
               className="bg-surface border border-border-glow rounded-xl px-5 py-3 outline-none focus:border-primary/40 text-foreground text-sm font-bold transition-all shadow-sm"
               value={curriculum}
               onChange={(e) => setCurriculum(e.target.value)}
             >
               <option value="">All Curricula</option>
               {Array.from(new Set(courses.map(c => c.curriculum))).map(c => (
                 <option key={c} value={c}>{c}</option>
               ))}
             </select>
           </div>

           <div className="flex flex-col gap-1.5">
             <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary/60 ml-1">Subject</span>
             <select 
               className="bg-surface border border-border-glow rounded-xl px-5 py-3 outline-none focus:border-primary/40 text-foreground text-sm font-bold transition-all shadow-sm"
               value={subject}
               onChange={(e) => setSubject(e.target.value)}
             >
               <option value="">All Subjects</option>
               {Array.from(new Set(courses.map(c => c.subject))).map(s => (
                 <option key={s} value={s}>{s}</option>
               ))}
             </select>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-foreground">
        {filtered.map((course, index) => (
          <div 
            key={course.id} 
            className="glow-card rounded-[2rem] p-8 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-500 bg-white"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div>
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <BookOpen className="text-primary h-6 w-6 group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black bg-background border border-border-glow px-3 py-1 rounded-full text-primary uppercase tracking-wider mb-1">
                    {course.curriculum}
                  </span>
                  <span className="text-[9px] font-bold text-text-secondary/50 uppercase tracking-[0.2em]">Validated</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors leading-tight">
                {course.title}
              </h3>
              <p className="text-text-secondary/70 text-sm mb-8 leading-relaxed line-clamp-3 font-medium">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-10">
                <span className="text-[11px] bg-primary/5 border border-primary/10 text-primary px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider">
                  {course.subject}
                </span>
                <span className="text-[11px] bg-surface border border-border-glow text-text-secondary px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider">
                  {course.level}
                </span>
              </div>
            </div>

            {isLoggedIn ? (
              <form action={enrolInCourse}>
                 <input type="hidden" name="courseId" value={course.id} />
                 <button type="submit" className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group/btn overflow-hidden relative">
                   <span className="relative z-10">Enrol Now</span>
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                 </button>
              </form>
            ) : (
              <Link href="/register" className="w-full py-4 bg-primary text-white text-center font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group/btn overflow-hidden relative">
                <span className="relative z-10">Register to Enrol</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
              </Link>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-32 glow-card rounded-[3rem]">
             <div className="w-20 h-20 bg-surface border border-border-glow rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-text-secondary/20" />
             </div>
             <h3 className="text-2xl font-bold mb-2">No Courses Found</h3>
             <p className="text-text-secondary max-w-md mx-auto">Adjust your filters to discover our premium academic offerings.</p>
          </div>
        )}
      </div>
    </div>
  );
}
