"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function createCourse(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const subject = formData.get("subject") as string;
  const level = formData.get("level") as string;
  const curriculum = formData.get("curriculum") as string;

  if (!title || !description || !subject || !level || !curriculum) {
    throw new Error("All fields are required");
  }

  await prisma.course.create({
    data: {
      title,
      description,
      subject,
      level,
      curriculum,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/courses");
  redirect("/admin");
}

export async function createResource(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const type = formData.get("type") as string;
  const courseId = formData.get("courseId") as string;
  const file = formData.get("file") as File | null;
  let url = formData.get("url") as string;

  if (!title || !type || !courseId) {
    throw new Error("Title, Type, and Course are required");
  }

  // Handle local file upload if present
  if (file && file.size > 0) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      
      // Ensure directory exists (extra check)
      await fs.mkdir(uploadsDir, { recursive: true });
      
      await fs.writeFile(path.join(uploadsDir, fileName), buffer);
      url = `/uploads/${fileName}`;
    } catch (error) {
      console.error("File upload error:", error);
      throw new Error("Failed to upload file");
    }
  } else if (!url) {
    throw new Error("Either a file or a URL must be provided");
  }

  await prisma.resource.create({
    data: {
      title,
      type,
      url,
      courseId,
    },
  });

  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateUserRole(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const userId = formData.get("userId") as string;
  const newRole = formData.get("role") as string;
  
  if (!userId || !newRole) {
    throw new Error("Missing parameters");
  }

  if (session.id === userId) {
    throw new Error("Cannot change your own role");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin");
}

export async function updateEnrolmentStatus(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const enrolmentId = formData.get("enrolmentId") as string;
  const status = formData.get("status") as string;

  if (!enrolmentId || !status) {
    throw new Error("Missing parameters");
  }

  await prisma.enrollment.update({
    where: { id: enrolmentId },
    data: { status },
  });

  revalidatePath("/admin/enrolments");
  revalidatePath("/admin");
}

export async function createPost(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const desc = formData.get("desc") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  const readTime = formData.get("readTime") as string;

  if (!title || !category || !desc || !content || !author || !readTime) {
    throw new Error("All fields are required");
  }

  await prisma.post.create({
    data: {
      title,
      category,
      desc,
      content,
      author,
      readTime,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/blog");
  redirect("/admin");
}
