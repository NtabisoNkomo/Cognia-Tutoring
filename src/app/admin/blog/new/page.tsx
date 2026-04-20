import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createPost } from "@/lib/admin-actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewPostPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
           <Link href="/admin" className="text-text-secondary hover:text-foreground flex items-center gap-2 mb-4 w-fit transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Admin
           </Link>
           <h1 className="text-4xl font-black heading-elite mb-2">Compose Post</h1>
           <p className="text-text-secondary italic">"The pen is the tongue of the mind." — Cervantes</p>
        </div>

        <div className="glow-card p-10 rounded-[2.5rem]">
           <form action={createPost} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-text-secondary/60">Article Title</label>
                    <input 
                      type="text" 
                      id="title" 
                      name="title" 
                      required
                      className="w-full px-6 py-4 bg-background border border-border-glow rounded-2xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                      placeholder="e.g. The Future of AI in Education"
                    />
                 </div>
                 <div className="space-y-2">
                    <label htmlFor="category" className="text-xs font-black uppercase tracking-widest text-text-secondary/60">Category</label>
                    <select 
                      id="category" 
                      name="category" 
                      required
                      className="w-full px-6 py-4 bg-background border border-border-glow rounded-2xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium appearance-none"
                    >
                       <option value="Curriculum Analysis">Curriculum Analysis</option>
                       <option value="Exam Strategy">Exam Strategy</option>
                       <option value="Subject Deep-Dive">Subject Deep-Dive</option>
                       <option value="Cognitive Science">Cognitive Science</option>
                       <option value="Psychology">Psychology</option>
                    </select>
                 </div>
              </div>

              <div className="space-y-2">
                 <label htmlFor="desc" className="text-xs font-black uppercase tracking-widest text-text-secondary/60">Short Snippet (Excerpt)</label>
                 <textarea 
                   id="desc" 
                   name="desc" 
                   required
                   rows={2}
                   className="w-full px-6 py-4 bg-background border border-border-glow rounded-2xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none font-medium"
                   placeholder="A brief teaser to pull readers in..."
                 />
              </div>

              <div className="space-y-2">
                 <label htmlFor="content" className="text-xs font-black uppercase tracking-widest text-text-secondary/60">Article Content</label>
                 <textarea 
                   id="content" 
                   name="content" 
                   required
                   rows={12}
                   className="w-full px-6 py-4 bg-background border border-border-glow rounded-2xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none font-medium leading-relaxed"
                   placeholder="Write your masterpiece here..."
                 />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label htmlFor="author" className="text-xs font-black uppercase tracking-widest text-text-secondary/60">Author Name</label>
                    <input 
                      type="text" 
                      id="author" 
                      name="author" 
                      required
                      defaultValue={session.name}
                      className="w-full px-6 py-4 bg-background border border-border-glow rounded-2xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                    />
                 </div>
                 <div className="space-y-2">
                    <label htmlFor="readTime" className="text-xs font-black uppercase tracking-widest text-text-secondary/60">Read Time</label>
                    <input 
                      type="text" 
                      id="readTime" 
                      name="readTime" 
                      required
                      className="w-full px-6 py-4 bg-background border border-border-glow rounded-2xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                      placeholder="e.g. 5 min"
                    />
                 </div>
              </div>

              <div className="pt-6 flex justify-end gap-6">
                 <Link href="/admin" className="px-8 py-4 border border-border-glow rounded-2xl text-text-secondary hover:text-foreground hover:bg-background transition-all font-black uppercase tracking-widest text-xs">
                    Draft
                 </Link>
                 <button type="submit" className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20">
                    Publish Article
                 </button>
              </div>
           </form>
        </div>

      </div>
    </div>
  );
}
