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
    <div>
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-border-glow pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Course Listing</h1>
          <p className="text-lg text-text-secondary">Browse structured courses strictly aligned with official curricula.</p>
        </div>
        <div className="flex gap-4">
           <select 
             className="bg-surface border border-border-glow rounded-lg px-4 py-2 outline-none focus:border-accent text-foreground"
             value={curriculum}
             onChange={(e) => setCurriculum(e.target.value)}
           >
             <option value="">All Curricula</option>
             {Array.from(new Set(courses.map(c => c.curriculum))).map(c => (
               <option key={c} value={c}>{c}</option>
             ))}
           </select>

           <select 
             className="bg-surface border border-border-glow rounded-lg px-4 py-2 outline-none focus:border-accent text-foreground"
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-foreground">
        {filtered.map(course => (
          <div key={course.id} className="bg-surface border border-border-glow rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-lg"><BookOpen className="text-primary h-5 w-5" /></div>
                <span className="text-xs font-bold bg-background border border-border-glow px-2 py-1 rounded text-text-secondary">{course.curriculum}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-sm text-text-secondary mb-4">{course.description}</p>
              
              <div className="flex gap-2 mb-8">
                <span className="text-xs bg-background border border-border-glow px-2 py-1 rounded font-medium">{course.subject}</span>
                <span className="text-xs bg-background border border-border-glow px-2 py-1 rounded font-medium">{course.level}</span>
              </div>
            </div>

            {isLoggedIn ? (
              <form action={enrolInCourse}>
                 <input type="hidden" name="courseId" value={course.id} />
                 <button type="submit" className="w-full text-center py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors">
                   Enrol Now
                 </button>
              </form>
            ) : (
              <Link href="/login" className="w-full text-center py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors inline-block">
                Login to Enrol
              </Link>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-24 text-text-secondary">
             No courses found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
