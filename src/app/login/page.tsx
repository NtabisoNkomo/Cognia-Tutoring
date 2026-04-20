"use client";

import { useState } from "react";
import Link from "next/link";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setError("");
    const res = await loginUser(formData);
    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Background glow touches */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="w-full max-w-md bg-surface p-8 rounded-2xl border border-border-glow shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Login</h1>
          <p className="text-text-secondary">Welcome back to Cognia Tutoring</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-600 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
            />
          </div>
          
          <div className="flex justify-end">
            <Link href="#" className="text-sm text-primary hover:text-accent transition-colors font-medium">Forgot password?</Link>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-all shadow-[0_10px_20px_rgba(76,175,80,0.2)] hover:shadow-[0_10px_30px_rgba(76,175,80,0.3)] mt-4"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary">
            Don't have an account? <Link href="/register" className="text-primary font-semibold hover:text-accent ml-1 transition-colors">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
