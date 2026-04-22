import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Newspaper, Clock, User } from "lucide-react";
import { deletePost } from "@/lib/admin-actions";
import { format } from "date-fns";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminBlogPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const posts = await prisma.post.findMany({
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
            <h1 className="text-4xl lg:text-5xl font-black heading-elite mb-2">Blog Management</h1>
            <p className="text-lg text-text-secondary/70 italic">Curate and manage your academic insights</p>
          </div>
          <Link 
            href="/admin/blog/new" 
            className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Article
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post) => (
              <div key={post.id} className="glow-card p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider rounded-full border border-primary/10">
                      {post.category}
                    </span>
                    <span className="text-xs text-text-secondary flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {format(new Date(post.createdAt), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-text-secondary text-sm line-clamp-2 max-w-2xl mb-4">{post.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-text-secondary font-medium">
                    <User className="w-3 h-3" /> {post.author}
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 border-border-glow pt-4 md:pt-0">
                  <DeleteButton 
                    action={deletePost} 
                    id={post.id} 
                    idName="postId" 
                    confirmMessage="Are you sure you want to delete this article?"
                    title="Delete Article"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glow-card rounded-[3rem]">
            <div className="w-20 h-20 bg-surface border border-border-glow rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-10 h-10 text-text-secondary/40" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No articles yet</h3>
            <p className="text-text-secondary mb-8">Share your first academic insight with the community.</p>
            <Link 
              href="/admin/blog/new" 
              className="inline-flex items-center gap-2 px-8 py-4 border border-border-glow rounded-2xl hover:bg-surface transition-all font-black uppercase tracking-widest text-xs"
            >
              <Plus className="w-4 h-4" /> Start Writing
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
