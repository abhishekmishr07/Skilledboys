"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, LogIn, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function LoginPage() {
  const router = useRouter();
  const { success } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      success("Logged in successfully! Welcome to SkilledBoys.");
      router.push("/find-workers");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-xl shadow-purple-900/5">
        
        {/* Title */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3">
            <Image
              src="/images/skilledboyslogo1.png"
              alt="SkilledBoys"
              width={56}
              height={56}
              className="mx-auto"
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            Welcome Back 👋
          </h1>
          <p className="text-sm font-semibold text-brand-600 mt-1">
            Sign In to SkilledBoys
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-brand-600 focus:ring-brand-500" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-brand-600 font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" size="lg" isLoading={loading} className="w-full font-bold mt-2">
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center gap-3 text-gray-400 text-xs uppercase font-bold tracking-wider">
          <span className="h-px w-16 bg-gray-200" />
          <span>or switch to</span>
          <span className="h-px w-16 bg-gray-200" />
        </div>

        {/* Worker Portal Link */}
        <Link
          href="/worker-login"
          className="w-full py-3 px-4 rounded-2xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-brand-700 font-bold text-sm flex items-center justify-center gap-2 transition"
        >
          <span>Are you a service worker? Worker Login →</span>
        </Link>

        {/* Sign up link */}
        <p className="mt-6 text-center text-gray-500 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-brand-600 font-bold hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}
