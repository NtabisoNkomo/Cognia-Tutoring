"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function enrolInCourse(formData: FormData) {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  const courseId = formData.get("courseId") as string;
  if (!courseId) {
    throw new Error("Course ID is required");
  }

  // Check if course exists
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  // Check if already enrolled
  const existingEnrolment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.id,
        courseId: courseId,
      }
    }
  });

  if (!existingEnrolment) {
    await prisma.enrollment.create({
      data: {
        userId: session.id,
        courseId: courseId,
        status: "ACTIVE",
      }
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/courses");
  redirect("/dashboard");
}
