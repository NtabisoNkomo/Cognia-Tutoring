import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateUserRole } from "@/lib/admin-actions";
import { formatDistanceToNow } from "date-fns";

export default async function UsersManagementPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc"
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
             <h1 className="text-3xl font-bold text-foreground">User Management</h1>
             <p className="text-text-secondary">View registered users and manage their roles.</p>
           </div>
        </div>

        <div className="bg-surface border border-border-glow rounded-2xl shadow-sm overflow-hidden text-foreground">
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-border-glow bg-background/50">
                   <th className="p-4 font-semibold text-sm">Name</th>
                   <th className="p-4 font-semibold text-sm">Email</th>
                   <th className="p-4 font-semibold text-sm">Registered</th>
                   <th className="p-4 font-semibold text-sm">Role</th>
                   <th className="p-4 font-semibold text-sm text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-border-glow">
                 {users.length === 0 ? (
                   <tr>
                     <td colSpan={5} className="p-8 text-center text-text-secondary">
                       No users found.
                     </td>
                   </tr>
                 ) : (
                   users.map((user) => (
                     <tr key={user.id} className="hover:bg-background/20 transition-colors">
                       <td className="p-4 font-medium">{user.name}</td>
                       <td className="p-4 text-text-secondary text-sm">{user.email}</td>
                       <td className="p-4 text-text-secondary text-sm">
                         {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                       </td>
                       <td className="p-4">
                         <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                           user.role === 'ADMIN' ? 'bg-primary/10 text-primary' : 
                           user.role === 'PARENT' ? 'bg-secondary/10 text-secondary' : 
                           'bg-surface text-text-secondary border border-border-glow'
                         }`}>
                           {user.role}
                         </span>
                       </td>
                       <td className="p-4 text-right">
                         <form action={updateUserRole} className="inline-flex gap-2">
                            <input type="hidden" name="userId" value={user.id} />
                            <select 
                              name="role" 
                              className="text-xs bg-background border border-border-glow rounded-lg px-2 py-1 focus:outline-none disabled:opacity-50"
                              defaultValue={user.role}
                              disabled={session.id === user.id}
                            >
                              <option value="STUDENT">STUDENT</option>
                              <option value="PARENT">PARENT</option>
                              <option value="ADMIN">ADMIN</option>
                            </select>
                            <button 
                               type="submit" 
                               disabled={session.id === user.id}
                               className="text-xs bg-surface border border-border-glow hover:bg-background px-3 py-1 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-surface"
                            >
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
