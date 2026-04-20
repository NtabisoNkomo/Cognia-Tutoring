import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createCourse } from "@/lib/admin-actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewCoursePage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
           <Link href="/admin" className="text-text-secondary hover:text-foreground flex items-center gap-2 mb-4 w-fit transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Admin
           </Link>
           <h1 className="text-3xl font-bold text-foreground">Add New Course</h1>
           <p className="text-text-secondary">Fill in the details to create a new course offering.</p>
        </div>

        <div className="bg-surface border border-border-glow p-8 rounded-2xl shadow-sm">
           <form action={createCourse} className="space-y-6">
              <div>
                 <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">Course Title</label>
                 <input 
                   type="text" 
                   id="title" 
                   name="title" 
                   required
                   className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                   placeholder="e.g. A-Level Mathematics"
                 />
              </div>

              <div>
                 <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">Description</label>
                 <textarea 
                   id="description" 
                   name="description" 
                   required
                   rows={4}
                   className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                   placeholder="Detailed course description..."
                 />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      required
                      className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                      placeholder="e.g. Mathematics"
                    />
                 </div>
                 <div>
                    <label htmlFor="level" className="block text-sm font-medium text-foreground mb-2">Level</label>
                    <input 
                      type="text" 
                      id="level" 
                      name="level" 
                      required
                      className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                      placeholder="e.g. A-Level"
                    />
                 </div>
              </div>

              <div>
                 <label htmlFor="curriculum" className="block text-sm font-medium text-foreground mb-2">Curriculum</label>
                 <input 
                   type="text" 
                   id="curriculum" 
                   name="curriculum" 
                   required
                   className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                   placeholder="e.g. Cambridge / CIE"
                 />
              </div>

              <div className="pt-4 flex justify-end gap-4">
                 <Link href="/admin" className="px-6 py-3 border border-border-glow rounded-xl text-text-secondary hover:text-foreground hover:bg-background transition-all font-medium">
                    Cancel
                 </Link>
                 <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium">
                    Create Course
                 </button>
              </div>
           </form>
        </div>

      </div>
    </div>
  );
}
