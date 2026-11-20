"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Mail, Phone, Lock, MapPin, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function RegisterPage() {
  const router = useRouter();
  const { success } = useToast();
  const [role, setRole] = useState<"user" | "worker">("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "worker") {
      router.push("/worker-register");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      success("Account created successfully! Welcome to SkilledBoys.");
      router.push("/find-workers");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-xl shadow-purple-900/5">
        
        {/* Title */}
        <div className="text-center mb-6">
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
            Join SkilledBoys
          </h1>
          <p className="text-sm font-semibold text-brand-600 mt-1">
            Create an Account in Seconds
          </p>
        </div>

        {/* Role Toggle Switch */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition ${
              role === "user"
                ? "bg-white text-brand-700 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            I&apos;m a Customer
          </button>
          <button
            type="button"
            onClick={() => {
              setRole("worker");
              router.push("/worker-register");
            }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition ${
              role === "worker"
                ? "bg-white text-brand-700 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            I&apos;m a Worker Pro
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-12 pl-10 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
              />
            </div>
          </div>

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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-12 pl-10 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                required
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-12 pl-10 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              City / Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                required
                placeholder="e.g. Noida, Delhi"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full h-12 pl-10 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Create Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-12 pl-10 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
              />
            </div>
          </div>

          <Button type="submit" size="lg" isLoading={loading} className="w-full font-bold mt-2">
            Create Customer Account
          </Button>
        </form>

        {/* Existing login link */}
        <p className="mt-6 text-center text-gray-500 text-sm">
          Already registered?{" "}
          <Link href="/login" className="text-brand-600 font-bold hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}
