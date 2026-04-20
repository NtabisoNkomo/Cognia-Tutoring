import prisma from "@/lib/prisma";
import CourseClient from "./CourseClient";
import { getSession } from "@/lib/auth";

export default async function CoursesPage() {
  const session = await getSession();
  const courses = await prisma.course.findMany({
    orderBy: { title: "asc" }
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CourseClient courses={courses} isLoggedIn={!!session} />
      </div>
    </div>
  );
}
