"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/Toast";
import { Phone, Lock, LogIn, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function WorkerLoginPage() {
  const router = useRouter();
  const { success, error: showError } = useToast();

  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!number || !password) {
      showError("Please enter your registered phone number and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.loginWorker({ number, password });
      if (res.success) {
        success(`Welcome back, ${res.worker?.name || "Professional"}!`);
        router.push("/worker-dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showError(err.message);
      } else {
        showError("Invalid login credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-xl shadow-purple-900/5">
        
        {/* Logo and title */}
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Worker Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            Worker Sign In
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Access your profile, job alerts and availability status.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Registered Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                required
                placeholder="e.g. 9876543210"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Account Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
              />
            </div>
          </div>

          <Button type="submit" size="lg" isLoading={loading} className="w-full font-bold">
            <LogIn className="h-4 w-4" />
            <span>Sign In to Dashboard</span>
          </Button>

        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center space-y-3">
          <p className="text-sm text-gray-600">
            Don&apos;t have a worker profile yet?{" "}
            <Link
              href="/worker-register"
              className="text-brand-600 font-bold hover:underline"
            >
              Register here
            </Link>
          </p>
          <p className="text-xs text-gray-400">
            Are you a customer?{" "}
            <Link href="/login" className="text-gray-600 hover:text-brand-600 underline">
              Customer Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
