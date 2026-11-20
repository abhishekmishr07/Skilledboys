"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/Toast";
import {
  User,
  Phone,
  Lock,
  Wrench,
  MapPin,
  Briefcase,
  Calendar,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function WorkerRegisterPage() {
  const router = useRouter();
  const { success, error: showError } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    password: "",
    category: "",
    location: "",
    experience: 2,
    age: 26,
    gender: "Male",
    hourlyRate: 300,
    bio: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.number || !formData.password || !formData.category || !formData.location) {
      showError("Please fill in all required registration fields.");
      return;
    }

    if (formData.number.length < 10) {
      showError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.registerWorker(formData);
      if (res.success) {
        success("Registration successful! You can now log in to your dashboard.");
        router.push("/worker-login");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showError(err.message);
      } else {
        showError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-xl shadow-purple-900/5">
        
        {/* Header */}
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
            <Sparkles className="h-3.5 w-3.5" />
            <span>Join Our Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            Worker Registration
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create your profile, receive direct customer leads and grow your income.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 pl-10 pr-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full h-11 pl-10 pr-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Create Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-11 pl-10 pr-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition"
              />
            </div>
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Service Trade *
              </label>
              <div className="relative">
                <Wrench className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-11 pl-10 pr-8 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition cursor-pointer appearance-none"
                >
                  <option value="">Select Category</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Cook">Cook / Chef</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Painter">Painter</option>
                  <option value="Driver">Driver</option>
                  <option value="Maid">Maid / Housekeeper</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Labour">Labour / Helper</option>
                  <option value="Gardener">Gardener</option>
                  <option value="Yoga Instructor">Yoga Instructor</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Primary Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full h-11 pl-10 pr-8 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition cursor-pointer appearance-none"
                >
                  <option value="">Select Location</option>
                  <option value="Noida">Noida</option>
                  <option value="Greater Noida">Greater Noida</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Lucknow">Lucknow</option>
                  <option value="Jaipur">Jaipur</option>
                </select>
              </div>
            </div>
          </div>

          {/* Experience, Age & Gender */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Exp. (Yrs)
              </label>
              <input
                type="number"
                min={0}
                max={50}
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                className="w-full h-11 px-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Age
              </label>
              <input
                type="number"
                min={18}
                max={75}
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full h-11 px-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full h-11 px-2 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition cursor-pointer text-center"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Hourly Rate & Bio */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Short Introduction / Bio
            </label>
            <textarea
              rows={2}
              placeholder="e.g. 5+ years experience in domestic wiring and appliance installations."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-500 text-sm outline-none transition resize-none"
            />
          </div>

          <Button type="submit" size="lg" isLoading={loading} className="w-full font-bold mt-2">
            Register as Professional
          </Button>

        </form>

        {/* Existing login link */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/worker-login"
              className="text-brand-600 font-bold hover:underline"
            >
              Sign In Here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
