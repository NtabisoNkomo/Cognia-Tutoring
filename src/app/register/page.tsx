"use client";

import { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/lib/auth";

export default function RegisterPage() {
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setError("");
    const res = await registerUser(formData);
    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-24">
      <div className="w-full max-w-lg bg-surface p-8 rounded-2xl border border-border-glow shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create an Account</h1>
          <p className="text-text-secondary">Start your journey with Cognia Tutoring</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
            <input name="name" type="text" required className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl focus:border-accent outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
            <input name="email" type="email" required className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl focus:border-accent outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
            <input name="password" type="password" required className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl focus:border-accent outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Grade Level</label>
              <select name="grade" required className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl focus:border-accent outline-none text-foreground">
                <option value="">Select Grade</option>
                <option value="Primary School">Primary School</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12 (Matric)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Curriculum</label>
              <select name="curriculum" required className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl focus:border-accent outline-none text-foreground">
                <option value="">Select...</option>
                <option value="CAPS">CAPS</option>
                <option value="IEB">IEB</option>
                <option value="Cambridge">Cambridge</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-md mt-6">
            Register Account
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-border-glow">
          <p className="text-sm text-text-secondary">
            Already have an account? <Link href="/login" className="text-primary font-semibold hover:text-accent ml-1">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
