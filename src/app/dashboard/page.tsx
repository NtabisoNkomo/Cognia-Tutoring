import prisma from "@/lib/prisma";
import Link from "next/link";
import { getSession, logoutUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BookOpen, MapPin, Download, BookMarked, User as UserIcon } from "lucide-react";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const enrolments = await prisma.enrollment.findMany({
    where: { userId: session.id },
    include: {
      course: {
        include: {
          resources: true,
        }
      }
    }
  });

  const enrolledCourses = enrolments.map(e => e.course);
  const resources = enrolledCourses.flatMap(course => course.resources);

  // Dashboard must show: Enrolled courses, Progress tracking, Upcoming sessions, Downloadable resources, Profile settings

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-border-glow pb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
            <p className="text-text-secondary">Welcome back, {session.name}</p>
          </div>
          <form action={logoutUser}>
             <button className="px-6 py-2 bg-surface border border-border-glow text-text-secondary rounded-lg font-medium hover:text-foreground transition-all">
                Sign Out
             </button>
          </form>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* Enrolled Courses */}
             <div className="bg-surface border border-border-glow rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><BookOpen className="text-primary w-5 h-5"/> Enrolled Courses</h2>
                
                <div className="space-y-4">
                  {enrolledCourses.length > 0 ? (
                     enrolledCourses.map(course => (
                       <div key={course.id} className="border border-border-glow rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <h3 className="font-bold text-foreground">{course.title}</h3>
                            <p className="text-sm text-text-secondary">{course.curriculum} • {course.level}</p>
                          </div>
                          <div className="w-full md:w-48">
                             <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span className="font-bold text-accent">0%</span>
                             </div>
                             <div className="w-full h-2 bg-background border border-border-glow rounded-full overflow-hidden">
                                <div className="h-full bg-accent shadow-[0_0_10px_rgba(76,175,80,0.4)] w-[0%]"></div>
                             </div>
                          </div>
                       </div>
                     ))
                  ) : (
                     <p className="text-text-secondary">You are not enrolled in any courses yet.</p>
                  )}
                </div>
             </div>

             {/* Downloadable Resources */}
             <div className="bg-surface border border-border-glow rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><BookMarked className="text-secondary w-5 h-5"/> Study Materials</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                   {resources.length > 0 ? (
                      resources.map(resource => (
                        <div key={resource.id} className="flex items-center justify-between p-4 border border-border-glow rounded-xl bg-background">
                           <div>
                              <p className="font-semibold text-sm">{resource.title}</p>
                              <p className="text-xs text-text-secondary">{resource.type}</p>
                           </div>
                           <a href={resource.url} target="_blank" rel="noreferrer" className="text-primary hover:text-accent p-2 bg-primary/10 rounded-lg transition-colors border border-primary/10 hover:border-accent/30"><Download className="w-4 h-4"/></a>
                        </div>
                      ))
                   ) : (
                      <p className="text-text-secondary col-span-full">No study materials available.</p>
                   )}
                </div>
             </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             {/* Profile Settings Stub */}
             <div className="bg-surface border border-border-glow rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><UserIcon className="text-primary w-5 h-5"/> Profile</h2>
                <div className="space-y-3 text-sm">
                   <div className="flex justify-between"><span className="text-text-secondary">Name</span><span className="font-medium">{session.name}</span></div>
                   <div className="flex justify-between"><span className="text-text-secondary">Email</span><span className="font-medium">{session.email}</span></div>
                   <div className="flex justify-between"><span className="text-text-secondary">Grade</span><span className="font-medium">{session.grade || 'N/A'}</span></div>
                   <div className="flex justify-between"><span className="text-text-secondary">Curriculum</span><span className="font-medium">{session.curriculum || 'N/A'}</span></div>
                </div>
                <button className="mt-6 w-full py-2 bg-background border border-border-glow rounded-lg text-sm font-medium hover:bg-surface text-foreground transition-colors">
                   Edit Profile
                </button>
             </div>

             {/* Upcoming Sessions */}
              <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl border border-primary/20 relative overflow-hidden">
                 {/* Internal glow */}
                 <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
                 
                 <h2 className="text-xl font-bold mb-4 relative z-10">Upcoming Sessions</h2>
                 <div className="space-y-4 relative z-10">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                       <p className="font-bold">A-Level Physics</p>
                       <p className="text-sm opacity-80 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3"/> Zoom Meeting</p>
                       <p className="text-xs bg-accent text-accent-foreground inline-block px-3 py-1.5 rounded-lg font-bold mt-3 shadow-lg">Today, 15:00 PM</p>
                    </div>
                 </div>
              </div>
          </div>

        </div>

      </div>
    </div>
  );
}
