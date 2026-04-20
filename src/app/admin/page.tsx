import { getSession, logoutUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, BookOpen, UserPlus, Settings, FileText } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default async function AdminPage() {
  const session = await getSession();
  
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const usersCount = await prisma.user.count();
  const coursesCount = await prisma.course.count();
  const enrolmentsCount = await prisma.enrollment.count({
    where: { status: "ACTIVE" }
  });
  const resourcesCount = await prisma.resource.count();

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5
  });
  
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-12 border-b border-border-glow pb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Admin Portal</h1>
            <p className="text-text-secondary">Manage system resources and user accounts.</p>
          </div>
          <form action={logoutUser}>
             <button className="px-6 py-2 bg-surface text-text-secondary border border-border-glow rounded-lg font-medium hover:bg-background transition-all hover:text-foreground">
                Sign Out
             </button>
          </form>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
           <div className="bg-surface border border-border-glow p-6 rounded-2xl shadow-sm hover:border-primary/30 transition-colors">
              <div className="text-primary bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl mb-4 border border-primary/10"><Users /></div>
              <p className="text-xs text-text-secondary font-bold uppercase tracking-wider mb-1">Total Users</p>
              <h3 className="text-3xl font-bold text-foreground">{usersCount}</h3>
           </div>
           
           <div className="bg-surface border border-border-glow p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-colors">
              <div className="text-accent bg-accent/10 w-12 h-12 flex items-center justify-center rounded-xl mb-4 border border-accent/10"><BookOpen /></div>
              <p className="text-xs text-text-secondary font-bold uppercase tracking-wider mb-1">Total Courses</p>
              <h3 className="text-3xl font-bold text-foreground">{coursesCount}</h3>
           </div>

           <div className="bg-surface border border-border-glow p-6 rounded-2xl shadow-sm hover:border-secondary/30 transition-colors">
              <div className="text-secondary bg-secondary/10 w-12 h-12 flex items-center justify-center rounded-xl mb-4 border border-secondary/10"><UserPlus /></div>
              <p className="text-xs text-text-secondary font-bold uppercase tracking-wider mb-1">Active Enrolments</p>
              <h3 className="text-3xl font-bold text-foreground">{enrolmentsCount}</h3>
           </div>

           <div className="bg-surface border border-border-glow p-6 rounded-2xl shadow-sm hover:border-primary/30 transition-colors">
              <div className="text-text-secondary bg-background border border-border-glow w-12 h-12 flex items-center justify-center rounded-xl mb-4"><FileText /></div>
              <p className="text-xs text-text-secondary font-bold uppercase tracking-wider mb-1">Resources</p>
              <h3 className="text-3xl font-bold text-foreground">{resourcesCount}</h3>
           </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
           {/* Quick Actions */}
           <div className="bg-surface border border-border-glow rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground"><Settings className="w-5 h-5"/> Quick Actions</h2>
              <div className="space-y-4">
                 <Link href="/admin/courses/new" className="w-full flex items-center justify-between p-4 bg-background border border-border-glow border-dashed rounded-xl hover:bg-primary/5 hover:border-primary/50 transition-colors text-foreground">
                    <span className="font-semibold text-sm">Add New Course</span>
                    <span className="text-xl">+</span>
                 </Link>
                 <Link href="/admin/resources/new" className="w-full flex items-center justify-between p-4 bg-background border border-border-glow border-dashed rounded-xl hover:bg-accent/5 hover:border-accent/50 transition-colors text-foreground">
                    <span className="font-semibold text-sm">Upload Resource</span>
                    <span className="text-xl">+</span>
                 </Link>
                 <Link href="/admin/enrolments" className="w-full flex items-center justify-between p-4 bg-background border border-border-glow border-dashed rounded-xl hover:bg-secondary/5 hover:border-secondary/50 transition-colors text-foreground">
                    <span className="font-semibold text-sm">Manage Enrolments</span>
                    <span className="text-xl">→</span>
                 </Link>
                 <Link href="/admin/users" className="w-full flex items-center justify-between p-4 bg-background border border-border-glow border-dashed rounded-xl hover:bg-primary/5 hover:border-primary/50 transition-colors text-foreground">
                    <span className="font-semibold text-sm">User Management</span>
                    <span className="text-xl">→</span>
                 </Link>
              </div>
           </div>

           {/* Recent Activity */}
           <div className="bg-surface border border-border-glow rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-foreground">Recent Registrations</h2>
              {recentUsers.length > 0 ? (
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex justify-between items-center p-4 bg-background border border-border-glow rounded-xl">
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-text-secondary">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${user.role === 'ADMIN' ? 'bg-primary/10 text-primary' : 'bg-surface text-text-secondary'}`}>
                          {user.role}
                        </span>
                        <p className="text-xs text-text-secondary mt-1 tracking-tight">
                          {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-text-secondary">
                  <p className="text-sm">No recent activity found.</p>
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
}
