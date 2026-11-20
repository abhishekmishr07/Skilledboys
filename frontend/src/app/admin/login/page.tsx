"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/Toast";
import { Shield, Lock, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const { success, error: showError } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      showError("Username and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.loginAdmin({ username, password });
      if (res.success) {
        success("Admin authenticated successfully!");
        router.push("/admin/dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showError(err.message);
      } else {
        showError("Invalid administrator credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3">
            <Image
              src="/images/skilledboyslogo1.png"
              alt="SkilledBoys"
              width={56}
              height={56}
              className="mx-auto brightness-150"
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/20">
            <Shield className="h-3.5 w-3.5" />
            <span>Admin Control Panel</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            Administrator Login
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Access worker management, platform metrics and CRUD operations.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                required
                autoComplete="off"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-2xl border border-gray-700 bg-gray-800 text-white text-sm outline-none focus:border-brand-500 transition placeholder:text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="password"
                required
                autoComplete="new-password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-2xl border border-gray-700 bg-gray-800 text-white text-sm outline-none focus:border-brand-500 transition placeholder:text-gray-500"
              />
            </div>
          </div>

          <Button type="submit" size="lg" isLoading={loading} className="w-full font-bold">
            <LogIn className="h-4 w-4" />
            <span>Enter Admin Dashboard</span>
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-800 text-center">
          <Link href="/" className="text-xs text-gray-500 hover:text-white transition">
            ← Return to SkilledBoys Home
          </Link>
        </div>

      </div>
    </div>
  );
}
