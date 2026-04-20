import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateEnrolmentStatus } from "@/lib/admin-actions";
import { formatDistanceToNow } from "date-fns";

export default async function EnrolmentsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const enrolments = await prisma.enrollment.findMany({
    include: {
      user: true,
      course: true,
    },
    orderBy: {
      enrolledAt: "desc"
    }
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
           <div>
             <Link href="/admin" className="text-text-secondary hover:text-foreground flex items-center gap-2 mb-4 w-fit transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Admin
             </Link>
             <h1 className="text-3xl font-bold text-foreground">Manage Enrolments</h1>
             <p className="text-text-secondary">View and update student course enrolments.</p>
           </div>
        </div>

        <div className="bg-surface border border-border-glow rounded-2xl shadow-sm overflow-hidden text-foreground">
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-border-glow bg-background/50">
                   <th className="p-4 font-semibold text-sm">Student</th>
                   <th className="p-4 font-semibold text-sm">Email</th>
                   <th className="p-4 font-semibold text-sm">Course</th>
                   <th className="p-4 font-semibold text-sm">Enrolled At</th>
                   <th className="p-4 font-semibold text-sm">Status</th>
                   <th className="p-4 font-semibold text-sm text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-border-glow">
                 {enrolments.length === 0 ? (
                   <tr>
                     <td colSpan={6} className="p-8 text-center text-text-secondary">
                       No enrolments found.
                     </td>
                   </tr>
                 ) : (
                   enrolments.map((enrolment) => (
                     <tr key={enrolment.id} className="hover:bg-background/20 transition-colors">
                       <td className="p-4">{enrolment.user.name}</td>
                       <td className="p-4 text-text-secondary text-sm">{enrolment.user.email}</td>
                       <td className="p-4 font-medium">{enrolment.course.title}</td>
                       <td className="p-4 text-text-secondary text-sm">
                         {formatDistanceToNow(new Date(enrolment.enrolledAt), { addSuffix: true })}
                       </td>
                       <td className="p-4">
                         <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                           enrolment.status === 'ACTIVE' ? 'bg-primary/10 text-primary' : 
                           enrolment.status === 'COMPLETED' ? 'bg-accent/10 text-accent' : 
                           'bg-surface text-text-secondary border border-border-glow'
                         }`}>
                           {enrolment.status}
                         </span>
                       </td>
                       <td className="p-4 text-right">
                         <form action={updateEnrolmentStatus} className="inline-flex gap-2">
                            <input type="hidden" name="enrolmentId" value={enrolment.id} />
                            <select 
                              name="status" 
                              className="text-xs bg-background border border-border-glow rounded-lg px-2 py-1 focus:outline-none"
                              defaultValue={enrolment.status}
                            >
                              <option value="ACTIVE">ACTIVE</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="WITHDRAWN">WITHDRAWN</option>
                            </select>
                            <button type="submit" className="text-xs bg-surface border border-border-glow hover:bg-background px-3 py-1 rounded-lg transition-colors">
                               Update
                            </button>
                         </form>
                       </td>
                     </tr>
                   ))
                 )}
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
}
