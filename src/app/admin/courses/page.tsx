import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Plus, BookOpen, GraduationCap, Layers } from "lucide-react";
import { deleteCourse } from "@/lib/admin-actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminCoursesPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-border-glow pb-10">
          <div>
            <Link href="/admin" className="text-text-secondary hover:text-foreground flex items-center gap-2 mb-4 w-fit transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <h1 className="text-4xl lg:text-5xl font-black heading-elite mb-2">Course Management</h1>
            <p className="text-lg text-text-secondary/70 italic">Orchestrate your academic curriculum</p>
          </div>
          <Link 
            href="/admin/courses/new" 
            className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Course
          </Link>
        </div>

        {courses.length > 0 ? (
          <div className="grid gap-6">
            {courses.map((course) => (
              <div key={course.id} className="glow-card p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-wider rounded-full border border-accent/10 flex items-center gap-1">
                      <Layers className="w-3 h-3" /> {course.curriculum}
                    </span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider rounded-full border border-primary/10 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" /> {course.level}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-text-secondary text-sm line-clamp-2 max-w-2xl mb-4 font-medium">{course.description}</p>
                  <div className="flex items-center gap-2 text-xs text-text-secondary font-bold uppercase tracking-widest">
                    {course.subject}
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 border-border-glow pt-4 md:pt-0">
                  <DeleteButton 
                    action={deleteCourse} 
                    id={course.id} 
                    idName="courseId" 
                    confirmMessage="Are you sure you want to delete this course? This will also remove all associated enrolments."
                    title="Delete Course"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glow-card rounded-[3rem]">
            <div className="w-20 h-20 bg-surface border border-border-glow rounded-3xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-text-secondary/40" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No courses found</h3>
            <p className="text-text-secondary mb-8">Begin your academic legacy by adding your first course.</p>
            <Link 
              href="/admin/courses/new" 
              className="inline-flex items-center gap-2 px-8 py-4 border border-border-glow rounded-2xl hover:bg-surface transition-all font-black uppercase tracking-widest text-xs"
            >
              <Plus className="w-4 h-4" /> Add Course
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
