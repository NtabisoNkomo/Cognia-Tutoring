import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { createResource } from "@/lib/admin-actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewResourcePage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const courses = await prisma.course.findMany({
    orderBy: { title: "asc" }
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
           <Link href="/admin" className="text-text-secondary hover:text-foreground flex items-center gap-2 mb-4 w-fit transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Admin
           </Link>
           <h1 className="text-3xl font-bold text-foreground">Upload Resource</h1>
           <p className="text-text-secondary">Add a new resource to an existing course.</p>
        </div>

        <div className="bg-surface border border-border-glow p-8 rounded-2xl shadow-sm">
           <form action={createResource} className="space-y-6">
              <div>
                 <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">Resource Title</label>
                 <input 
                   type="text" 
                   id="title" 
                   name="title" 
                   required
                   className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                   placeholder="e.g. Chapter 1 Worksheet"
                 />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">Resource Type</label>
                    <select 
                      id="type" 
                      name="type" 
                      required
                      className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none"
                    >
                       <option value="">Select a type...</option>
                       <option value="PDF">PDF Document</option>
                       <option value="WORKSHEET">Worksheet</option>
                       <option value="VIDEO">Video Link</option>
                    </select>
                 </div>
                 <div>
                    <label htmlFor="courseId" className="block text-sm font-medium text-foreground mb-2">Associated Course</label>
                    <select 
                      id="courseId" 
                      name="courseId" 
                      required
                      className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none"
                    >
                       <option value="">Select a course...</option>
                       {courses.map((course) => (
                         <option key={course.id} value={course.id}>
                           {course.title} ({course.level})
                         </option>
                       ))}
                    </select>
                 </div>
              </div>

              <div>
                 <label htmlFor="url" className="block text-sm font-medium text-foreground mb-2">Resource URL</label>
                 <input 
                   type="url" 
                   id="url" 
                   name="url" 
                   required
                   className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                   placeholder="https://example.com/resource.pdf"
                 />
                 <p className="mt-2 text-xs text-text-secondary">Provide a direct link to the resource file or video.</p>
              </div>

              <div className="pt-4 flex justify-end gap-4">
                 <Link href="/admin" className="px-6 py-3 border border-border-glow rounded-xl text-text-secondary hover:text-foreground hover:bg-background transition-all font-medium">
                    Cancel
                 </Link>
                 <button type="submit" className="px-6 py-3 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-colors font-medium">
                    Upload Resource
                 </button>
              </div>
           </form>
        </div>

      </div>
    </div>
  );
}
